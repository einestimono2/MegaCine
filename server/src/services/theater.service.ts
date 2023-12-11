import { type Request } from 'express';

import { cloudinaryServices, managerServices } from '.';
import { MAX_DISTANCE_IN_METERS, Message, THEATER_UPLOAD_FOLDER } from '../constants';
import { type IUpdateTheaterRequest, type ITheater } from '../interfaces';
import { BadRequestError, ConflictError, NotFoundError, TheaterModel } from '../models';
import { addPaginationPipelineStage, convertRequestToPipelineStages, convertToMongooseId } from '../utils';
import { type PipelineStage } from 'mongoose';

export const createTheater = async (theater: ITheater, managerPayload?: Record<string, any>) => {
  // Manager đã có theater - Mỗi quản lý chỉ có 1 theater duy nhất
  if (!managerPayload || managerPayload.theater) {
    throw new ConflictError(Message.MANAGER_OWNED_THEATER);
  }

  const newtheater = new TheaterModel(theater);
  await newtheater.validate();

  // Upload ảnh
  if (theater.logo) {
    newtheater.logo = await cloudinaryServices.uploadImage({
      public_id: `${newtheater._id}_logo`,
      folder: THEATER_UPLOAD_FOLDER,
      file: theater.logo
    });
  }

  if (theater.images.length) {
    for (let idx = 0; idx < theater.images.length; idx++) {
      newtheater.images[idx] = await cloudinaryServices.uploadImage({
        public_id: `${newtheater._id}_images_${idx}`,
        folder: THEATER_UPLOAD_FOLDER,
        file: theater.images[idx]
      });
    }
  }

  // Nếu validate xảy ra lỗi thì xóa các ảnh đã up (nếu có)
  await newtheater.save();

  // Cập nhật id của rạp vào model manager
  const manager = await managerServices.getManagerById(managerPayload.id);
  manager.theater = newtheater._id;
  await manager.save();

  return newtheater;
};

export const getTheaterById = async (id: string) => {
  const theater = await TheaterModel.findById(id);
  if (!theater) {
    throw new NotFoundError(Message.THEATER_NOT_FOUND);
  }

  return theater;
};

export const getTheaterDetails = async (id: string, lang?: string) => {
  const [theater] = await TheaterModel.aggregate([
    { $match: { _id: convertToMongooseId(id) } },
    { $set: { description: lang ? `$description.${lang}` : `$description` } }
  ]);

  if (!theater) {
    throw new NotFoundError(Message.THEATER_NOT_FOUND);
  }

  return theater;
};

export const deleteTheater = async (id: string, managerId?: string) => {
  if (!managerId) {
    throw new NotFoundError(Message.MANAGER_THEATER_EMPTY);
  }

  const doc = await TheaterModel.findByIdAndDelete(id);
  if (!doc) {
    throw new NotFoundError(Message.THEATER_NOT_FOUND);
  }
};

export const updateTheater = async (id: string, newTheater: IUpdateTheaterRequest) => {
  // Xóa ảnh mới khỏi obj nếu có
  const logo = newTheater.logo;
  if (logo) delete newTheater.logo;
  const images = newTheater.images;
  if (images !== undefined) delete newTheater.images;

  const theater = await getTheaterById(id);
  Object.assign(theater, newTheater);
  await theater.validate();

  if (logo) {
    theater.logo = await cloudinaryServices.uploadImage({
      public_id: `${theater._id}_logo`,
      folder: THEATER_UPLOAD_FOLDER,
      file: logo
    });
  }

  if (images?.length) {
    for (let idx = 0; idx < images.length; idx++) {
      theater.images[idx] = await cloudinaryServices.uploadImage({
        public_id: `${theater._id}_images_${idx}`,
        folder: THEATER_UPLOAD_FOLDER,
        file: images[idx]
      });
    }
  }

  return await theater.save();
};

export const getTheaters = async (req: Request) => {
  const options = convertRequestToPipelineStages({
    req,
    // fieldsApplySearch: ['name'],
    localizationFields: ['description']
  });

  return await TheaterModel.aggregate(options);
};

export const getMostRateTheaters = async (req: Request) => {
  const _limit = req.query.top ? Number(req.query.top) : 5;

  const _match = req.query.theaterId
    ? { _id: { $ne: convertToMongooseId(req.query.theaterId as string) }, isActive: true }
    : { isActive: true };

  const pipeline: PipelineStage[] = [
    { $match: _match },
    { $set: { description: `$description.name.${req.getLocale()}` } },
    { $sort: { ratingAverage: -1, ratingCount: -1, totalFavorites: -1 } },
    { $limit: _limit }
  ];

  return await TheaterModel.aggregate(pipeline);
};

export const getTheatersByCity = async (req: Request) => {
  const matchCityStage: PipelineStage[] = [
    { $addFields: { city: { $trim: { input: { $last: { $split: ['$address', ','] } } } } } }
  ];

  if (req.query.city) {
    matchCityStage.push({
      $match: { $expr: { $regexMatch: { input: '$city', regex: req.query.city, options: 'im' } } }
    });
    matchCityStage.push({ $project: { city: 0 } });
  } else {
    matchCityStage.push({
      $group: { _id: '$city', city: { $first: '$city' }, count: { $count: {} }, theaters: { $push: '$$ROOT' } }
    });
    matchCityStage.push({ $project: { _id: 0, 'theaters.city': 0 } });
  }

  const sortStage: PipelineStage = req.query.city
    ? { $sort: { ratingAverage: -1, ratingCount: -1, totalFavorites: -1 } }
    : { $sort: { city: 1, ratingAverage: -1, ratingCount: -1, totalFavorites: -1 } };

  const query: PipelineStage[] = [
    { $match: { isActive: true } },
    ...matchCityStage,
    { $set: { description: `$description.name.${req.getLocale()}` } },
    sortStage
  ];

  addPaginationPipelineStage({ req, pipeline: query });

  return await TheaterModel.aggregate(query);
};

export const getNearbyTheaters = async (long: number, lat: number) => {
  const isValidate = long >= -180 && long <= 180 && lat >= -90 && lat <= 90;
  if (!isValidate) throw new BadRequestError(Message.INVALID_COORDINATES);

  return await TheaterModel.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [long, lat]
        },
        distanceField: 'distance',
        includeLocs: 'location',
        maxDistance: MAX_DISTANCE_IN_METERS,
        spherical: true
      }
    },
    { $match: { isActive: true } },
    { $limit: 5 }
  ]);
};
