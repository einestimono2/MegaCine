import { type NextFunction, type Request, type Response } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';

import { CatchAsyncError } from '../middlewares';
import { ErrorHandler } from '../utils';
import { redis } from '../config';
import { HttpStatusCode, Message } from '../constants';

//! Cookies session
// export const isAuthenticated = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//   const accessToken = req.cookies.access_token;
//   if (!accessToken) {
//     next(new ErrorHandler(Message.LOGIN_TO_ACCESS_RESOURCE, HttpStatusCode.BAD_REQUEST_400));
//     return;
//   }

//   const decodedData = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;
//   if (!decodedData) {
//     next(new ErrorHandler(Message.TOKEN_IS_INVALID, HttpStatusCode.BAD_REQUEST_400));
//     return;
//   }

//   const user = await redis.get(decodedData.id);
//   if (!user) {
//     next(new ErrorHandler(Message.USER_NOT_FOUND, HttpStatusCode.BAD_REQUEST_400));
//     return;
//   }

//   req.user = JSON.parse(user);

//   next();
// });

//! Bearer Token
export const isAuthenticated = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.split(' ')[1];
  if (!accessToken) {
    next(new ErrorHandler(Message.BEARER_TOKEN_EMPTY, HttpStatusCode.BAD_REQUEST_400));
    return;
  }

  // Giải mã lấy id
  const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;
  if (!payload) {
    next(new ErrorHandler(Message.TOKEN_IS_INVALID, HttpStatusCode.BAD_REQUEST_400));
    return;
  }

  // Check blacklist
  const blacklist = await redis.get(`BL_${payload.id}`);
  if (blacklist && blacklist === accessToken) {
    next(new ErrorHandler(Message.TOKEN_IS_INVALID_TRY_AGAIN, HttpStatusCode.BAD_REQUEST_400));
    return;
  }

  req.userId = payload.id;
  req.userRole = payload.role;
  req.accessToken = accessToken;

  next();
});

export const verifyRefreshToken = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    next(new ErrorHandler(Message.TOKEN_IS_INVALID, HttpStatusCode.BAD_REQUEST_400));
    return;
  }

  const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as JwtPayload;
  if (!payload) {
    next(new ErrorHandler(Message.TOKEN_IS_INVALID_TRY_AGAIN, HttpStatusCode.BAD_REQUEST_400));
    return;
  }

  // verify if token is in store or not
  const userJSON = await redis.get(payload.id as string);
  if (!userJSON) {
    next(new ErrorHandler(Message.USER_NOT_FOUND, HttpStatusCode.BAD_REQUEST_400));
    return;
  }

  const user = JSON.parse(userJSON); // { accessToken, refreshToken }

  if (user.refreshToken !== refreshToken) {
    next(new ErrorHandler(Message.TOKEN_IS_INVALID, HttpStatusCode.BAD_REQUEST_400));
    return;
  }

  req.userId = payload.id;
  req.userRole = payload.role;
  req.accessToken = user.accessToken;

  next();
});

// Check role
export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    console.log(req);
    if (!roles.includes(req.userRole ?? '')) {
      // Role: ${req.user.role} insufficient access rights
      next(new ErrorHandler(Message.INSUFFICIENT_ACCESS_RIGHTS, HttpStatusCode.FORBIDDEN_403));
      return;
    }

    next();
  };
};
