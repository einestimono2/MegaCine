import { type Request } from 'express';

import { cloudinaryServices, managerServices } from '.';
import { MAX_DISTANCE_IN_METERS, Message } from '../constants';
import { type IUpdateTheaterRequest, type ITheater } from '../interfaces';
import { BadRequestError, ConflictError, NotFoundError, TheaterModel } from '../models';
import { convertRequestToPipelineStages, convertToMongooseId } from '../utils';

export const createTheater = async (
  theater: ITheater,
  managerPayload?: Record<string, any>,
  files?: Record<string, Express.Multer.File[]>
) => {
  // Manager đã có theater - Mỗi quản lý chỉ có 1 theater duy nhất
  if (!managerPayload || managerPayload.theater) {
    throw new ConflictError(Message.MANAGER_OWNED_THEATER);
  }

  // Convert object
  if (theater.description && typeof theater.description === 'string') {
    try {
      theater.description = JSON.parse(theater.description);
    } catch (_) {}
  }
  if (theater.location && typeof theater.location === 'string') {
    try {
      theater.location = JSON.parse(theater.location);
    } catch (_) {}
  }

  // Upload ảnh
  if (files?.logo?.length) {
    theater.logo = await cloudinaryServices.uploadImage(files.logo[0].path, 'theater/logos');
  }

  theater.images = []; // req.body có giá trị = '' nếu k có dữ liệu
  if (files?.images?.length) {
    for (const image of files.images) {
      theater.images.push(await cloudinaryServices.uploadImage(image.path, 'theater/images'));
    }
  }

  const newtheater = new TheaterModel(theater);

  // Nếu validate xảy ra lỗi thì xóa các ảnh đã up (nếu có)
  await newtheater.save().catch(async (err) => {
    await cloudinaryServices.destroy(theater.logo.public_id); // Xóa logo
    if (theater.images) {
      for (let idx = 0; idx < theater.images.length; idx++) {
        await cloudinaryServices.destroy(theater.images[idx].public_id); // Xóa image
      }
    }

    throw err;
  });

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

  const theater = await getTheaterById(id);

  // Xóa ảnh trên cloudinary
  await cloudinaryServices.destroy(theater.logo.public_id);
  for (const image of theater.images) {
    await cloudinaryServices.destroy(image.public_id);
  }

  // Xóa theater tại manager
  const manager = await managerServices.getManagerById(managerId);
  manager.theater = undefined;
  await manager.save();

  // TODO: Xóa fare table và những thứ liên quan

  await theater.deleteOne();
};

export const updateTheater = async (id: string, newTheater: IUpdateTheaterRequest) => {
  let logo;
  let images;

  if (newTheater.logo !== undefined || newTheater.images !== undefined) {
    const theater = await getTheaterById(id);

    if (newTheater.logo) {
      logo = await cloudinaryServices.replaceImage(theater.logo.public_id, newTheater.logo, 'theater/logos');
    }

    if (newTheater.images?.length) {
      // Xóa ảnh cũ
      for (let i = 0; i < theater.images.length; i++) {
        await cloudinaryServices.destroy(theater.images[i].public_id);
      }

      images = [];
      for (const img of newTheater.images) {
        images.push(await cloudinaryServices.uploadImage(img, 'theater/images'));
      }
    }
  }

  let description;
  if (newTheater.description) {
    try {
      description = JSON.parse(newTheater.description);
    } catch (_) {}
  }
  let location;
  if (newTheater.location) {
    try {
      location = JSON.parse(newTheater.location);
    } catch (_) {}
  }

  const theater = await TheaterModel.findByIdAndUpdate(
    id,
    { newTheater, logo, images, description, location },
    { new: true }
  );
  if (!theater) throw new NotFoundError(Message.THEATER_NOT_FOUND);

  return theater;
};

export const getTheaters = async (req: Request) => {
  const options = convertRequestToPipelineStages({
    req,
    // fieldsApplySearch: ['name'],
    localizationFields: ['description']
  });

  return await TheaterModel.aggregate(options);
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
