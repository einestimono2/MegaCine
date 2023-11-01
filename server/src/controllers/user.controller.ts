import { type NextFunction, type Request, type Response } from 'express';

import { userServices } from '../services';
import { type IUpdatePasswordRequest } from '../interfaces';
import { CatchAsyncError } from '../middlewares';
import { Message } from '../constants';
import { BadRequestError, NotFoundError } from '../models';

//! Profile
export const getProfile = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const user = await userServices.getUserById(req.userPayload!.id);

  res.sendOK({
    data: user
  });
});

export const updateProfile = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const user = await userServices.updateProfile(req.userPayload!.id, { ...req.body, avatar: req.file?.path });

  res.sendOK({
    data: user
  });
});

export const updateAvatar = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    next(new NotFoundError(Message.AVATAR_EMPTY));
    return;
  }

  const user = await userServices.updateProfile(req.userPayload!.id, { avatar: req.file.path });

  res.sendOK({
    data: user
  });
});

export const updatePassword = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const { oldPassword, newPassword } = req.body as IUpdatePasswordRequest;

  if (!oldPassword || !newPassword) {
    next(new BadRequestError(Message.OLD_OR_NEW_PASSWORD_EMPTY));
    return;
  }

  const user = await userServices.getUserById(req.userPayload!.id, true);

  // Trường hợp social login => không có mật khẩu
  if (user.password !== undefined) {
    const isPasswordMatchh = await user?.comparePassword(oldPassword);
    if (!isPasswordMatchh) {
      next(new BadRequestError(Message.WRONG_OLD_PASSWORD));
      return;
    }

    if (oldPassword === newPassword) {
      next(new BadRequestError(Message.PASSWORD_DOES_NOT_MATCH));
      return;
    }
  }

  user.password = newPassword;

  await user.save();

  res.sendCREATED({
    data: user
  });
});
