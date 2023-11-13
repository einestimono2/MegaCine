import { type NextFunction, type Request, type Response } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';

import { CatchAsyncError } from '../middlewares';
import { redis } from '../config';
import { Message, Roles } from '../constants';
import { BadRequestError, ForbiddenError, ManagerModel, NotFoundError } from '../models';

//! Cookies session
// export const isAuthenticated = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//   const accessToken = req.cookies.access_token;
//   if (!accessToken) {
//     next(new BadRequestError(Message.LOGIN_TO_ACCESS_RESOURCE));
//     return;
//   }

//   const decodedData = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;
//   if (!decodedData) {
//     next(new BadRequestError(Message.TOKEN_IS_INVALID));
//     return;
//   }

//   const user = await redis.get(decodedData.id);
//   if (!user) {
//     next(new BadRequestError(Message.USER_NOT_FOUND));
//     return;
//   }

//   req.user = JSON.parse(user);

//   next();
// });

//! Bearer Token
export const isAuthenticated = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.split(' ')[1];
  if (!accessToken) {
    next(new NotFoundError(Message.BEARER_TOKEN_EMPTY));
    return;
  }

  // Giải mã lấy id
  const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;
  if (!payload) {
    next(new BadRequestError(Message.TOKEN_IS_INVALID));
    return;
  }

  // Check blacklist
  const blacklist = await redis.get(`BL_${payload.id}`);
  if (blacklist && blacklist === accessToken) {
    next(new BadRequestError(Message.TOKEN_IS_INVALID_TRY_AGAIN));
    return;
  }

  // Gán theater khi token chưa cập nhật
  if (!payload.theater && payload.role !== Roles.User) {
    payload.theater = (await ManagerModel.findById(payload.id))?.theater;
  }

  req.userPayload = payload;
  req.accessToken = accessToken;

  next();
});

export const verifyRefreshToken = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    next(new NotFoundError(Message.TOKEN_IS_INVALID));
    return;
  }

  const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as JwtPayload;
  if (!payload) {
    next(new BadRequestError(Message.TOKEN_IS_INVALID_TRY_AGAIN));
    return;
  }

  // verify if token is in store or not
  const userJSON = await redis.get(payload.id as string);
  if (!userJSON) {
    next(new NotFoundError(Message.USER_NOT_FOUND));
    return;
  }

  const user = JSON.parse(userJSON); // { accessToken, refreshToken }

  if (user.refreshToken !== refreshToken) {
    next(new BadRequestError(Message.TOKEN_IS_INVALID));
    return;
  }

  req.userPayload = payload;
  req.accessToken = user.accessToken;

  next();
});

// Check role
export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!roles.includes(req.userPayload?.role ?? '')) {
      // Role: ${req.user.role} insufficient access rights
      next(new ForbiddenError(Message.INSUFFICIENT_ACCESS_RIGHTS));
      return;
    }

    next();
  };
};
