import { type Request } from 'express';
import { type PipelineStage } from 'mongoose';
import dayjs from 'dayjs';

import { Message, RoomTypes } from '../constants';
import { type IUpdateShowtimeRequest, type IShowtime } from '../interfaces';
import { FareModel, NotFoundError, ShowtimeModel } from '../models';
import { addPaginationPipelineStage, isSpecialDay, convertToMongooseId } from '../utils';

export const createShowtime = async (showtime: IShowtime) => {
  const _showtime = new ShowtimeModel(showtime); // Custom Validate trong middleware

  return await _showtime.save();
};

export const updateShowtime = async (id: string, showtime: IUpdateShowtimeRequest) => {
  const _showtime = await ShowtimeModel.findByIdAndUpdate(id, showtime, { new: true }); // Custom Validate trong middleware
  if (!_showtime) {
    throw new NotFoundError(Message.SHOWTIME_NOT_FOUND);
  }

  return _showtime;
};

export const deleteShowtime = async (id: string) => {
  return await ShowtimeModel.findByIdAndDelete(id);
};

// Groupby date
// Gồm nhiều rạp
// Mỗi rạp có list lịch chiếu tương ứng với phim đó
// Filter theo thành phố, định dạng 2d 3d, rạp (Hiển thị list rạp hoặc checkbox chọn rạp)
// Group loại 2d 3d
export const getShowtimesByMovie = async (id: string, req: Request) => {
  const pipeline: PipelineStage[] = [
    // 1. Filter data tương ứng - startTime + movie + isActive
    {
      $match: {
        // Nếu truyền date thì lấy date cùng y-m-d còn không lấy những date >= now
        $expr: {
          $cond: [
            req.query.date,
            { $eq: [{ $dateToString: { format: '%Y-%m-%d', date: '$startTime' } }, req.query.date] },
            { $gte: ['$startTime', dayjs(new Date()).startOf('day').toDate()] }
          ]
        },
        movie: convertToMongooseId(id),
        isActive: true
      }
    },
    // 2. Nối bảng room để lấy format của lịch chiếu đó 2D | 3D
    {
      $lookup: {
        from: 'rooms',
        localField: 'room',
        foreignField: '_id',
        pipeline: [
          {
            $project: {
              _id: 1,
              name: 1,
              type: 1
            }
          }
        ],
        as: 'room'
      }
    },
    // 3. Deconstruct array of objects --> object
    { $unwind: '$room' },
    // 4. Filter theo format nếu truyền
    {
      $match: {
        $expr: {
          $cond: [req.query.format, { $eq: ['$room.type', req.query.format] }, {}]
        }
      }
    },
    // 5. Group lần lượt theo data (y-m-d) --> theater --> type = format + language (vd: 2D Subtitles)
    {
      $group: {
        _id: {
          date: { $dateToString: { format: '%Y-%m-%d', date: '$startTime' } },
          theater: '$theater',
          type: { $concat: ['$room.type', ' ', '$language'] }
        },
        types: { $push: '$$ROOT' }
      }
    },
    // 6. Nhóm lịch chiếu tương ứng với type
    {
      $group: {
        _id: {
          date: '$_id.date',
          theater: '$_id.theater'
        },
        date: { $first: '$_id.date' },
        data: {
          $push: {
            type: '$_id.type',
            showtimes: '$types'
          }
        }
      }
    },
    // 7. Nối bảng theater
    {
      $lookup: {
        from: 'theaters',
        localField: '_id.theater',
        foreignField: '_id',
        pipeline: [
          {
            $project: {
              _id: 1,
              name: 1,
              address: 1,
              logo: 1,
              coordinates: '$location.coordinates'
            }
          }
        ],
        as: 'theater'
      }
    },
    // 8. Deconstruct array thành từng document (movie quan hệ 1-1 <=> mảng 1 phần tử kiểu obj <=> covert [{}] về {})
    { $unwind: '$theater' },
    // 9. Filter theo thành phố nếu truyền
    {
      $match: {
        $expr: {
          $cond: [
            req.query.location,
            { $regexMatch: { input: '$theater.address', regex: req.query.location, options: 'im' } },
            {}
          ]
        }
      }
    },
    // 10. Nhóm theater tương ứng với data (type + list lịch chiếu)
    {
      $group: {
        _id: '$_id.date',
        date: { $first: '$_id.date' },
        theaters: {
          $push: {
            theater: '$theater',
            types: '$data'
          }
        }
      }
    },
    // 11. Xóa trường id thừa, do đã thêm trường date = _id
    { $set: { _id: '$$REMOVE' } },
    // 12. Sắp xếp dữ liệu
    { $sort: { date: 1, 'theaters.types.showtimes.startTime': 1 } }
  ];

  addPaginationPipelineStage({ req, pipeline });

  return await ShowtimeModel.aggregate(pipeline);
};

// Groupby date
// Gồm nhiều phim
// Mỗi phim có list lịch chiếu tương ứng
// Group loại 2d 3d
export const getShowtimesByTheater = async (id: string, req: Request) => {
  const pipeline: PipelineStage[] = [
    // 1. Filter data tương ứng - startTime + theater + isActive
    {
      $match: {
        // Nếu truyền date thì lấy date cùng y-m-d còn không lấy những date >= now
        $expr: {
          $cond: [
            req.query.date,
            { $eq: [{ $dateToString: { format: '%Y-%m-%d', date: '$startTime' } }, req.query.date] },
            { $gte: ['$startTime', dayjs(new Date()).startOf('day').toDate()] }
          ]
        },
        theater: convertToMongooseId(id),
        isActive: true
      }
    },
    // 2. Nối bảng room để lấy format của lịch chiếu đó 2D | 3D
    {
      $lookup: {
        from: 'rooms',
        localField: 'room',
        foreignField: '_id',
        pipeline: [
          {
            $project: {
              _id: 1,
              name: 1,
              type: 1
            }
          }
        ],
        as: 'room'
      }
    },
    // 3. Deconstruct array of objects --> object
    { $unwind: '$room' },
    // 4. Group lần lượt theo data (y-m-d) --> movie --> type = format + language (vd: 2D Subtitles)
    {
      $group: {
        _id: {
          date: { $dateToString: { format: '%Y-%m-%d', date: '$startTime' } },
          movie: '$movie',
          type: { $concat: ['$room.type', ' ', '$language'] }
        },
        types: { $push: '$$ROOT' }
      }
    },
    // 5. Nhóm lịch chiếu tương ứng với type
    {
      $group: {
        _id: {
          date: '$_id.date',
          movie: '$_id.movie'
        },
        date: { $first: '$_id.date' },
        data: {
          $push: {
            type: '$_id.type',
            showtimes: '$types'
          }
        }
      }
    },
    // 6. Nối bảng movie
    {
      $lookup: {
        from: 'movies',
        localField: '_id.movie',
        foreignField: '_id',
        pipeline: [
          {
            $project: {
              _id: 1,
              title: 1,
              poster: 1,
              originalTitle: 1,
              type: 1,
              duration: 1,
              ageType: 1,
              trailer: 1
            }
          }
        ],
        as: 'movie'
      }
    },
    // 7. Deconstruct array thành từng document (movie quan hệ 1-1 <=> mảng 1 phần tử kiểu obj <=> covert [{}] về {})
    { $unwind: '$movie' },
    // 8. Nhóm movie tương ứng với data (type + list lịch chiếu)
    {
      $group: {
        _id: '$_id.date',
        date: { $first: '$_id.date' },
        movies: {
          $push: {
            movie: '$movie',
            types: '$data'
          }
        }
      }
    },
    // 9. Xóa trường id thừa, do đã thêm trường date = _id
    { $set: { _id: '$$REMOVE' } },
    // 10. Sắp xếp dữ liệu
    { $sort: { date: 1, 'movies.types.showtimes.startTime': 1 } }
  ];

  addPaginationPipelineStage({ req, pipeline });

  return await ShowtimeModel.aggregate(pipeline);
};

export const getShowtimeDetails = async (id: string) => {
  const _showtime = await ShowtimeModel.findOne({ _id: id, isActive: true })
    .populate('movie', { title: 1, originalTitle: 1, poster: 1, ageType: 1, formats: 1 })
    .populate('theater', { name: 1 })
    .populate('room', { name: 1, type: 1 });
  if (!_showtime) {
    throw new NotFoundError(Message.SHOWTIME_NOT_FOUND);
  }

  // Lấy bảng giá
  const is2D = (_showtime.room as any).type === RoomTypes['2D'];
  const project = is2D
    ? { weekend: 1, specialDay: 1, surcharge: 1, _2d: 1 }
    : { weekend: 1, specialDay: 1, surcharge: 1, _3d: 1 };

  const fare = await FareModel.findOne<any>({ theater: _showtime.theater }, project);
  if (!fare) throw new NotFoundError(Message.FARE_NOT_FOUND);

  const hhmm = new Date(_showtime.startTime).toLocaleTimeString(undefined, {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  });

  const _isSpecialDay = isSpecialDay(_showtime.startTime, fare.weekend, fare.specialDay);
  const price = fare[`${is2D ? '_2d' : '_3d'}`].find((e) => {
    const greaterThanLeft = e.from === '' ? true : hhmm >= e.from;
    const lessThanRight = e.to === '' ? true : hhmm <= e.to;
    return lessThanRight && greaterThanLeft;
  })?.seat;

  const _price: Record<string, any> = {};
  price.forEach((e) => {
    _price[e.type] = _isSpecialDay ? e.specialDayPrice : e.normalDayPrice;
  });

  return { price: _price, showtime: _showtime };
};
