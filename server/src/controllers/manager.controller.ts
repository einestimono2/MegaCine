import { type NextFunction, type Request, type Response } from 'express';

import { managerServices } from '../services';
import { CatchAsyncError } from '../middlewares';
import { sendToken } from '../utils';
import { HttpStatusCode, Message } from '../constants';
import { type IUpdatePasswordRequest, type IManagerLoginRequest } from '../interfaces';
import { BadRequestError } from '../models';

export const register = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  // Kiểm tra và tạo manager
  await managerServices.createManagerAndTheater(req);

  res.sendCREATED({
    message: res.translate(Message.WAIT_FOR_REGISTRATION_APPROVAL.msg)
  });
});

export const activateAccount = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const manager = await managerServices.getManagerById(req.params.id);

  if (!manager.isVerified) {
    manager.isVerified = true;
    await manager.save();
  }

  res.sendOK({
    message: res.translate(Message.ACCOUNT_ACTIVATION_SUCCESSFUL.msg)
  });
});

export const login = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const { code, password } = req.body as IManagerLoginRequest;
  if (!code || !password) {
    next(new BadRequestError(Message.FIELDS_EMPTY));
    return;
  }

  const manager = await managerServices.getManagerByCode(code, true);

  // Chưa xác nhận
  if (!manager.isVerified) {
    next(new BadRequestError(Message.ACCOUNT_NOT_ACTIVATED));
    return;
  }

  const isPasswordMatch = await manager.comparePassword(password);
  if (!isPasswordMatch) {
    next(new BadRequestError(Message.WRONG_PASSWORD));
    return;
  }

  await sendToken(manager, HttpStatusCode.OK_200, res);
});

export const updatePassword = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const { oldPassword, newPassword } = req.body as IUpdatePasswordRequest;

  if (!oldPassword || !newPassword) {
    next(new BadRequestError(Message.OLD_OR_NEW_PASSWORD_EMPTY));
    return;
  }

  const manager = await managerServices.getManagerById(req.userPayload!.id, true);

  if (manager.password !== undefined) {
    const isPasswordMatchh = await manager?.comparePassword(oldPassword);
    if (!isPasswordMatchh) {
      next(new BadRequestError(Message.WRONG_OLD_PASSWORD));
      return;
    }

    if (oldPassword === newPassword) {
      next(new BadRequestError(Message.PASSWORD_DOES_NOT_MATCH));
      return;
    }
  }

  manager.password = newPassword;

  await manager.save();

  res.sendCREATED({
    data: manager
  });
});

export const getManagers = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const [payload] = await managerServices.getManagers(req); // [ { extra: {}, data: [] } ]

  res.sendOK({
    data: payload?.data ?? [],
    extra: payload?.extra ?? { totalCount: 0 }
  });
});

export const getApprovalList = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const [payload] = await managerServices.getApprovalList(req); // [ { extra: {}, data: [] } ]

  res.sendOK({
    data: payload?.data ?? [],
    extra: payload?.extra ?? { totalCount: 0 }
  });
});

export const updateRole = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  let manager = await managerServices.getManagerById(req.params.id);

  if (manager.role !== req.body.role) {
    manager.role = req.body.role;

    manager = await manager.save();
  }

  res.sendCREATED({
    data: manager
  });
});

export const getManager = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const manager = await managerServices.getManagerDetails(req.params.id);

  res.sendOK({
    data: manager
  });
});

export const deleteManager = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  await managerServices.deleteManager(req.params.id);

  res.sendOK();
});

export const myTheater = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  //
});
