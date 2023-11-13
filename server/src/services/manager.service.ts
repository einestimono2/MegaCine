import { type Request } from 'express';

import { Message } from '../constants';
import { type IManager } from '../interfaces';
import { ManagerModel, NotFoundError } from '../models';
import { convertRequestToPipelineStages } from '../utils';

export const createManager = async (user: IManager) => {
  const isCodeExist = await ManagerModel.findOne({ code: user.code });
  if (isCodeExist) {
    throw new NotFoundError(Message.CODE_ALREADY_EXIST);
  }

  const newManager = new ManagerModel(user);

  return await newManager.save();
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

export const getManagers = async (req: Request) => {
  const options = convertRequestToPipelineStages({ req });

  return await ManagerModel.aggregate(options);
};

export const deleteManager = async (id: string) => {
  return await ManagerModel.findByIdAndDelete(id);
};
