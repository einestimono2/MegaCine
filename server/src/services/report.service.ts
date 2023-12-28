import { type Request } from 'express';
import { type PipelineStage } from 'mongoose';
import dayjs from 'dayjs';

import { BadRequestError, BookingModel } from '../models';
import { Message, Roles } from '../constants';
import { convertToMongooseId } from '../utils';

export const getRevenueOverview = async (req: Request) => {
  const isManager = req.userPayload?.role === Roles.Manager;

  const today = dayjs().startOf('day').format('YYYY-MM-DD');
  const yesterday = dayjs().startOf('day').subtract(1, 'day').format('YYYY-MM-DD');
  const startOfCurrentWeek = dayjs().startOf('week').add(1, 'day').format('YYYY-MM-DD');
  const startOfLastWeek = dayjs().startOf('week').subtract(6, 'day').format('YYYY-MM-DD');
  const endOfCurrentWeek = dayjs().endOf('week').add(1, 'day').format('YYYY-MM-DD');
  const endOfLastWeek = dayjs().endOf('week').subtract(6, 'day').format('YYYY-MM-DD');

  const pipelines: PipelineStage[] = [
    {
      $facet: {
        yesterday: [
          {
            $match: {
              $expr: {
                $eq: [{ $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone: '+07' } }, yesterday]
              }
            }
          },
          { $group: { _id: null, totalRevenue: { $sum: '$payment.totalPrice' }, totalCount: { $count: {} } } },
          { $project: { _id: 0 } }
        ],
        today: [
          {
            $match: {
              $expr: { $eq: [{ $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone: '+07' } }, today] }
            }
          },
          { $group: { _id: null, totalRevenue: { $sum: '$payment.totalPrice' }, totalCount: { $count: {} } } },
          { $project: { _id: 0 } }
        ],
        lastWeek: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $gte: [
                      { $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone: '+07' } },
                      startOfLastWeek
                    ]
                  },
                  {
                    $lte: [
                      { $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone: '+07' } },
                      endOfLastWeek
                    ]
                  }
                ]
              }
            }
          },
          {
            $group: {
              _id: null,
              totalRevenue: { $sum: '$payment.totalPrice' },
              totalCount: { $count: {} }
            }
          },
          { $project: { _id: 0 } }
        ],
        week: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $gte: [
                      { $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone: '+07' } },
                      startOfCurrentWeek
                    ]
                  },
                  {
                    $lte: [
                      { $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone: '+07' } },
                      endOfCurrentWeek
                    ]
                  }
                ]
              }
            }
          },
          {
            $group: {
              _id: null,
              totalRevenue: { $sum: '$payment.totalPrice' },
              totalCount: { $count: {} }
            }
          },
          { $project: { _id: 0 } }
        ]
      }
    },
    { $unwind: { path: '$yesterday', preserveNullAndEmptyArrays: true } },
    { $unwind: { path: '$today', preserveNullAndEmptyArrays: true } },
    { $unwind: { path: '$lastWeek', preserveNullAndEmptyArrays: true } },
    { $unwind: { path: '$week', preserveNullAndEmptyArrays: true } },
    {
      $fill: {
        output: {
          yesterday: { value: { totalCount: 0, totalRevenue: 0 } },
          today: { value: { totalCount: 0, totalRevenue: 0 } },
          lastWeek: { value: { totalCount: 0, totalRevenue: 0 } },
          week: { value: { totalCount: 0, totalRevenue: 0 } }
        }
      }
    }
  ];

  if (isManager) {
    pipelines.unshift({
      $match: { theater: convertToMongooseId(req.userPayload?.theater) }
    });
  }

  return await BookingModel.aggregate(pipelines);
};

export const getRevenueByYear = async (req: Request) => {
  const isManager = req.userPayload?.role === Roles.Manager;
  const currentYear = dayjs().startOf('day').format('YYYY');
  const year = Number(req.query.year ?? currentYear);

  if (isNaN(year)) {
    throw new BadRequestError(req.translate(Message.INVALID_NUMBER_s.msg, 'year'));
  }

  const pipelines: PipelineStage[] = [
    { $match: { $expr: { $eq: [{ $year: { date: '$createdAt', timezone: '+07' } }, year] } } },
    { $addFields: { month: { $month: { date: '$createdAt', timezone: '+07' } } } },
    {
      $bucket: {
        groupBy: '$month',
        boundaries: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        default: 'Other',
        output: {
          month: { $first: '$month' },
          totalCount: { $sum: 1 },
          totalRevenue: { $sum: '$payment.totalPrice' }
        }
      }
    },
    { $project: { _id: 0 } },
    { $densify: { field: 'month', range: { step: 1, bounds: [1, 13] } } },
    {
      $fill: {
        output: {
          totalCount: { value: 0 },
          totalRevenue: { value: 0 }
        }
      }
    }
  ];

  if (isManager) {
    pipelines.unshift({
      $match: { theater: convertToMongooseId(req.userPayload?.theater) }
    });
  }

  return await BookingModel.aggregate(pipelines);
};

export const getRevenueByTheater = async (req: Request) => {
  const pipelines: PipelineStage[] = [];
  const today = dayjs().startOf('day').format('YYYY-MM-DD');
  const from = req.query.from;
  const to = req.query.to;

  if (from && to) {
    pipelines.push({
      $match: {
        $expr: {
          $and: [
            { $gte: [{ $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone: '+07' } }, from] },
            { $lte: [{ $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone: '+07' } }, to] }
          ]
        }
      }
    });
  } else if (from) {
    pipelines.push({
      $match: {
        $expr: { $gte: [{ $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone: '+07' } }, from] }
      }
    });
  } else if (to) {
    pipelines.push({
      $match: {
        $expr: { $lte: [{ $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone: '+07' } }, to] }
      }
    });
  } else {
    pipelines.push({
      $match: {
        $expr: { $eq: [{ $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone: '+07' } }, today] }
      }
    });
  }

  pipelines.push(
    {
      $group: {
        _id: '$theater',
        theater: { $first: '$theater' },
        totalCount: { $sum: 1 },
        totalRevenue: { $sum: '$payment.totalPrice' }
      }
    },
    { $project: { _id: 0 } },
    {
      $lookup: {
        from: 'theaters',
        localField: 'theater',
        foreignField: '_id',
        pipeline: [{ $project: { _id: 1, name: 1 } }],
        as: 'theater'
      }
    },
    { $unwind: { path: '$theater', preserveNullAndEmptyArrays: true } }
  );

  return await BookingModel.aggregate(pipelines);
};

export const getRevenueByMovie = async (req: Request) => {
  const pipelines: PipelineStage[] = [{ $match: { theater: convertToMongooseId(req.userPayload?.theater) } }];
  const today = dayjs().startOf('day').format('YYYY-MM-DD');
  const from = req.query.from;
  const to = req.query.to;

  if (from && to) {
    pipelines.push({
      $match: {
        $expr: {
          $and: [
            { $gte: [{ $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone: '+07' } }, from] },
            { $lte: [{ $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone: '+07' } }, to] }
          ]
        }
      }
    });
  } else if (from) {
    pipelines.push({
      $match: {
        $expr: { $gte: [{ $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone: '+07' } }, from] }
      }
    });
  } else if (to) {
    pipelines.push({
      $match: {
        $expr: { $lte: [{ $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone: '+07' } }, to] }
      }
    });
  } else {
    pipelines.push({
      $match: {
        $expr: { $eq: [{ $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone: '+07' } }, today] }
      }
    });
  }

  pipelines.push(
    {
      $lookup: {
        from: 'showtimes',
        localField: 'showtime',
        foreignField: '_id',
        pipeline: [{ $project: { _id: 1, movie: 1 } }],
        as: 'showtime'
      }
    },
    {
      $unwind: { path: '$showtime', preserveNullAndEmptyArrays: true }
    },
    {
      $group: {
        _id: '$showtime.movie',
        movie: { $first: '$_id' },
        totalCount: { $sum: 1 },
        totalRevenue: { $sum: '$payment.totalPrice' }
      }
    },
    { $project: { _id: 0 } },
    {
      $lookup: {
        from: 'movies',
        localField: 'movie',
        foreignField: '_id',
        pipeline: [{ $project: { _id: 1, title: 1, originalTitle: 1 } }],
        as: 'movie'
      }
    },
    {
      $unwind: { path: '$movie', preserveNullAndEmptyArrays: true }
    }
  );

  return await BookingModel.aggregate(pipelines);
};

export const getRevenueByProduct = async (req: Request) => {
  const pipelines: PipelineStage[] = [{ $match: { theater: convertToMongooseId(req.userPayload?.theater) } }];
  const today = dayjs().startOf('day').format('YYYY-MM-DD');
  const from = req.query.from;
  const to = req.query.to;

  if (from && to) {
    pipelines.push({
      $match: {
        $expr: {
          $and: [
            { $gte: [{ $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone: '+07' } }, from] },
            { $lte: [{ $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone: '+07' } }, to] }
          ]
        }
      }
    });
  } else if (from) {
    pipelines.push({
      $match: {
        $expr: { $gte: [{ $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone: '+07' } }, from] }
      }
    });
  } else if (to) {
    pipelines.push({
      $match: {
        $expr: { $lte: [{ $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone: '+07' } }, to] }
      }
    });
  } else {
    pipelines.push({
      $match: {
        $expr: { $eq: [{ $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone: '+07' } }, today] }
      }
    });
  }

  pipelines.push(
    { $unwind: { path: '$products', preserveNullAndEmptyArrays: true } },
    { $set: { products: { $ifNull: ['$products', { item: 'Other', quantity: 1 }] } } },
    {
      $group: {
        _id: '$products.item',
        product: { $first: '$products.item' },
        totalCount: { $sum: 1 },
        productCount: { $sum: '$products.quantity' },
        totalRevenue: { $sum: '$payment.totalPrice' }
      }
    },
    {
      $lookup: {
        from: 'products',
        localField: 'product',
        foreignField: '_id',
        pipeline: [{ $project: { _id: 1, name: 1 } }],
        as: 'product'
      }
    },
    { $unwind: { path: '$product', preserveNullAndEmptyArrays: true } },
    { $set: { product: { $ifNull: ['$product.name', '$_id'] } } },
    { $project: { _id: 0 } }
  );

  return await BookingModel.aggregate(pipelines);
};
