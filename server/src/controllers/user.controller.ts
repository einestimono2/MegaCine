import { type NextFunction, type Request, type Response } from 'express';

import { userServices } from '../services';
import { type IUpdatePasswordRequest } from '../interfaces';
import { CatchAsyncError } from '../middlewares';
import { ErrorHandler } from '../utils';
import { HttpStatusCode, Message } from '../constants';

//! Profile
export const getProfile = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const user = await userServices.getUserById(req.userPayload!.id);

  res.status(HttpStatusCode.OK_200).json({
    status: 'success',
    data: { user }
  });
});

export const updateProfile = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const user = await userServices.updateProfile(req.userPayload!.id, { ...req.body, avatar: req.file?.path });

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

  const user = await userServices.updateProfile(req.userPayload!.id, { avatar: req.file.path });

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

  const user = await userServices.getUserById(req.userPayload!.id, true);

  // Trường hợp social login => không có mật khẩu
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
