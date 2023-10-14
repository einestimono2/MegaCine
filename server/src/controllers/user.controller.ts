import { type NextFunction, type Request, type Response } from 'express';

import { userServices, cloudinaryServices } from '../services';
import { type IUpdatePasswordRequest, type IUpdateProfileRequest } from '../interfaces';
import { CatchAsyncError } from '../middlewares';
import { ErrorHandler } from '../utils';
import { HttpStatusCode, Message } from '../constants';

//! Profile
export const getProfile = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const user = await userServices.findUserById(req.userPayload!.id);

  res.status(HttpStatusCode.OK_200).json({
    status: 'success',
    data: { user }
  });
});

export const updateProfile = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const { name, phoneNumber } = req.body as IUpdateProfileRequest;

  const user = await userServices.findUserById(req.userPayload!.id);
  if (!user) {
    next(new ErrorHandler(Message.USER_NOT_FOUND, HttpStatusCode.BAD_REQUEST_400));
    return;
  }

  if (name) user.name = name;
  if (phoneNumber) user.phoneNumber = phoneNumber;
  if (req.file) user.avatar = await cloudinaryServices.replaceAvatar(user.avatar.public_id, req.file.path);

  await user.save();

  res.status(HttpStatusCode.OK_200).json({
    status: 'success',
    data: { user }
  });
});

export const updateAvatar = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    next(new ErrorHandler(Message.AVATAR_EMPTY, HttpStatusCode.BAD_REQUEST_400));
    return;
  }

  const user = await userServices.findUserById(req.userPayload!.id);
  if (!user) {
    next(new ErrorHandler(Message.USER_NOT_FOUND, HttpStatusCode.BAD_REQUEST_400));
    return;
  }

  const imgID = user.avatar.public_id;
  if (imgID) await cloudinaryServices.destroy(imgID);

  user.avatar = await cloudinaryServices.uploadAvatar(req.file.path);

  await user.save();

  res.status(HttpStatusCode.OK_200).json({
    status: 'success',
    data: { user }
  });
});

export const updatePassword = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const { oldPassword, newPassword } = req.body as IUpdatePasswordRequest;

  if (!oldPassword || !newPassword) {
    next(new ErrorHandler(Message.OLD_OR_NEW_PASSWORD_EMPTY, HttpStatusCode.BAD_REQUEST_400));
    return;
  }

  const user = await userServices.findUserById(req.userPayload!.id, true);
  if (!user) {
    next(new ErrorHandler(Message.USER_NOT_FOUND, HttpStatusCode.BAD_REQUEST_400));
    return;
  }

  if (user.password !== undefined) {
    const isPasswordMatchh = await user?.comparePassword(oldPassword);
    if (!isPasswordMatchh) {
      next(new ErrorHandler(Message.WRONG_OLD_PASSWORD, HttpStatusCode.BAD_REQUEST_400));
      return;
    }

    if (oldPassword === newPassword) {
      next(new ErrorHandler(Message.PASSWORD_DOES_NOT_MATCH, HttpStatusCode.BAD_REQUEST_400));
      return;
    }
  }

  user.password = newPassword;

  await user.save();

  res.status(HttpStatusCode.CREATED_201).json({
    status: 'success',
    data: { user }
  });
});
