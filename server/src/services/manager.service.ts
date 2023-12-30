import { type Request } from 'express';
import { type PipelineStage } from 'mongoose';

import { Message, Roles, THEATER_UPLOAD_FOLDER } from '../constants';
import { type ITheater, type IManager } from '../interfaces';
import { ManagerModel, NotFoundError, TheaterModel } from '../models';
import { convertRequestToPipelineStages } from '../utils';
import { cloudinaryServices } from '.';

export const createManagerAndTheater = async (req: Request) => {
  const theater: ITheater = req.body;
  const manager: IManager = req.body;

  //! Tạo rạp
  const newTheater = new TheaterModel(theater);
  await newTheater.validate();

  //! Tạo manager
  const isCodeExist = await ManagerModel.findOne({ code: manager.code });
  if (isCodeExist) {
    throw new NotFoundError(Message.CODE_ALREADY_EXIST);
  }

  const newManager = new ManagerModel({ ...manager, theater: newTheater._id });
  await newManager.validate();

  // Upload ảnh
  if (theater.logo) {
    newTheater.logo = await cloudinaryServices.uploadImage({
      public_id: `${newTheater._id}_logo`,
      folder: THEATER_UPLOAD_FOLDER,
      file: theater.logo
    });
  }

  if (theater.images?.length) {
    for (let idx = 0; idx < theater.images.length; idx++) {
      newTheater.images[idx] = await cloudinaryServices.uploadImage({
        public_id: `${newTheater._id}_images_${idx}`,
        folder: THEATER_UPLOAD_FOLDER,
        file: theater.images[idx]
      });
    }
  }

  await newTheater.save();
  await newManager.save();
};

export const getManagerByCode = async (code: string, password: boolean = false) => {
  const manager = await ManagerModel.findOne({ code }).select(password ? '+password' : '-password');
  if (!manager) {
    throw new NotFoundError(Message.USER_NOT_FOUND);
  }

  return manager;
};

export const getManagerById = async (id: string, password: boolean = false) => {
  const manager = await ManagerModel.findById(id).select(password ? '+password' : '-password');
  if (!manager) {
    throw new NotFoundError(Message.USER_NOT_FOUND);
  }

  return manager;
};

export const getManagerDetails = async (id: string) => {
  const manager = await ManagerModel.findById(id).populate('theater');
  if (!manager) {
    throw new NotFoundError(Message.USER_NOT_FOUND);
  }

  return manager;
};

export const getManagers = async (req: Request) => {
  const query: PipelineStage[] = [
    { $match: { isVerified: true, role: Roles.Manager } },
    {
      $lookup: {
        from: 'theaters',
        localField: 'theater',
        foreignField: '_id',
        as: 'theater'
      }
    },
    { $unwind: { path: '$theater', preserveNullAndEmptyArrays: true } },
    { $sort: { createdAt: -1 } }
  ];

  const options = convertRequestToPipelineStages({
    req,
    fieldsApplySearch: ['_id', 'code', 'theater.name', 'theater.address', 'theater.email', 'theater.hotline']
  });

  return await ManagerModel.aggregate(query).append(...options);
};

export const getApprovalList = async (req: Request) => {
  const query: PipelineStage[] = [
    { $match: { isVerified: false, role: Roles.Manager } },
    {
      $lookup: {
        from: 'theaters',
        localField: 'theater',
        foreignField: '_id',
        as: 'theater'
      }
    },
    { $unwind: { path: '$theater', preserveNullAndEmptyArrays: true } },
    { $sort: { createdAt: -1 } }
  ];

  const options = convertRequestToPipelineStages({
    req,
    fieldsApplySearch: ['_id', 'code', 'theater.name', 'theater.address', 'theater.email', 'theater.hotline']
  });

  return await ManagerModel.aggregate(query).append(...options);
};

export const deleteManager = async (id: string) => {
  return await ManagerModel.findByIdAndDelete(id);
};
