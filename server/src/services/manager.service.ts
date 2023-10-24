import { type Request } from 'express';

import { HttpStatusCode, Message } from '../constants';
import { type IManager } from '../interfaces';
import { ManagerModel } from '../models';
import { ErrorHandler, convertRequestToPipelineStages } from '../utils';

export const createManager = async (user: IManager) => {
  const isCodeExist = await ManagerModel.findOne({ code: user.code });
  if (isCodeExist) {
    throw new ErrorHandler(Message.CODE_ALREADY_EXIST, HttpStatusCode.BAD_REQUEST_400);
  }

  const newManager = new ManagerModel(user);

  return await newManager.save();
};

export const getManagerByCode = async (code: string, password: boolean = false) => {
  const manager = await ManagerModel.findOne({ code }).select(password ? '+password' : '-password');
  if (!manager) {
    throw new ErrorHandler(Message.USER_NOT_FOUND, HttpStatusCode.BAD_REQUEST_400);
  }

  return manager;
};

export const getManagerById = async (id: string, password: boolean = false) => {
  const manager = await ManagerModel.findById(id).select(password ? '+password' : '-password');
  if (!manager) {
    throw new ErrorHandler(Message.USER_NOT_FOUND, HttpStatusCode.BAD_REQUEST_400);
  }

  return manager;
};

export const getManagers = async (req: Request) => {
  const options = convertRequestToPipelineStages(req);

  return await ManagerModel.aggregate(options);
};

export const deleteManager = async (id: string) => {
  const manager = await getManagerById(id);

  await manager.deleteOne();
};
