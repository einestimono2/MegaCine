import { type NextFunction, type Request, type Response } from 'express';

import { managerServices } from '../services';
import { CatchAsyncError } from '../middlewares';
import { ErrorHandler, sendToken } from '../utils';
import { HttpStatusCode, Message } from '../constants';
import { type IUpdatePasswordRequest, type IManagerLoginRequest } from '../interfaces';

export const register = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  // Kiểm tra và tạo manager
  const manager = await managerServices.createManager({ ...req.body });

  res.status(HttpStatusCode.CREATED_201).json({
    status: 'success',
    message: res.translate(Message.WAIT_FOR_REGISTRATION_APPROVAL),
    data: { manager }
  });
});

export const activateAccount = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const manager = await managerServices.getManagerById(req.params.id);

  if (!manager.isVerified) {
    manager.isVerified = true;
    await manager.save();
  }

  res.status(HttpStatusCode.OK_200).json({
    status: 'success',
    message: res.translate(Message.ACCOUNT_ACTIVATION_SUCCESSFUL)
  });
});

export const login = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const { code, password } = req.body as IManagerLoginRequest;
  if (!code || !password) {
    next(new ErrorHandler(Message.FIELDS_EMPTY, HttpStatusCode.BAD_REQUEST_400));
    return;
  }

  const manager = await managerServices.getManagerByCode(code, true);

  // Chưa xác nhận
  if (!manager.isVerified) {
    next(new ErrorHandler(Message.ACCOUNT_NOT_ACTIVATED, HttpStatusCode.BAD_REQUEST_400));
    return;
  }

  const isPasswordMatch = await manager.comparePassword(password);
  if (!isPasswordMatch) {
    next(new ErrorHandler(Message.WRONG_PASSWORD, HttpStatusCode.BAD_REQUEST_400));
    return;
  }

  await sendToken(manager, HttpStatusCode.OK_200, res);
});

export const updatePassword = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const { oldPassword, newPassword } = req.body as IUpdatePasswordRequest;

  if (!oldPassword || !newPassword) {
    next(new ErrorHandler(Message.OLD_OR_NEW_PASSWORD_EMPTY, HttpStatusCode.BAD_REQUEST_400));
    return;
  }

  const manager = await managerServices.getManagerById(req.userPayload!.id, true);

  if (manager.password !== undefined) {
    const isPasswordMatchh = await manager?.comparePassword(oldPassword);
    if (!isPasswordMatchh) {
      next(new ErrorHandler(Message.WRONG_OLD_PASSWORD, HttpStatusCode.BAD_REQUEST_400));
      return;
    }

    if (oldPassword === newPassword) {
      next(new ErrorHandler(Message.PASSWORD_DOES_NOT_MATCH, HttpStatusCode.BAD_REQUEST_400));
      return;
    }
  }

  manager.password = newPassword;

  await manager.save();

  res.status(HttpStatusCode.CREATED_201).json({
    status: 'success',
    data: { manager }
  });
});

export const getManagers = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const [payload] = await managerServices.getManagers(req); // [ { extra: {}, data: [] } ]

  res.status(HttpStatusCode.OK_200).json({
    status: 'success',
    data: {
      extra: payload?.extra ?? { totalCount: 0 },
      genres: payload?.data ?? []
    }
  });
});

export const updateManager = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  let manager = await managerServices.getManagerById(req.params.id);

  if (manager.role !== req.body.role) {
    manager.role = req.body.role;

    manager = await manager.save();
  }

  res.status(HttpStatusCode.OK_200).json({
    status: 'success',
    data: { manager }
  });
});

export const getManager = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const manager = await managerServices.getManagerById(req.params.id);

  res.status(HttpStatusCode.OK_200).json({
    status: 'success',
    data: { manager }
  });
});

export const deleteManager = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const manager = await managerServices.getManagerById(req.params.id);

  await manager.deleteOne();

  res.status(HttpStatusCode.OK_200).json({
    status: 'success'
  });
});

export const myTheater = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  //
});
