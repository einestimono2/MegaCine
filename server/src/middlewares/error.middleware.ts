import { type NextFunction, type Request, type Response } from 'express';
import { transpile } from 'typescript';
import fs from 'fs';

import logger from '../utils';
import { HttpStatusCode, Message } from '../constants';
import { BadRequestError } from '../models';

export function ErrorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  logger.error(err.message);

  err.statusCode = err.statusCode ?? HttpStatusCode.INTERNAL_SERVER_ERROR_500;
  err.ec = err.ec ?? err.statusCode;
  try {
    err.message = req.translate(err.message ?? Message.INTERNAL_SERVER_ERROR);
  } catch (_err) {}

  // Error: ValidationError -- mongoose
  if (err.name === 'ValidationError') {
    // Only show first error
    const firstError = err.errors[Object.keys(err.errors)[0]].message;

    let message: string;

    try {
      // eslint-disable-next-line no-eval
      message = eval(transpile(`req.translate(${firstError})`)); // Trường hợp có thêm value kèm
    } catch (error: any) {
      message = req.translate(firstError); // Trường hợp chỉ có key
    }

    err = new BadRequestError(message);
  }

  // Error: Wrong id in mongoDB
  if (err.name === 'CastError') {
    const message = req.translate(Message.RESOURCE_NOT_FOUND_INVALID_s.msg, err.path);
    err = new BadRequestError(message);
  }

  // Error: Duplicate key in mongoDB
  if (err.code === 11000) {
    const message = req.translate(Message.s_ALREADY_EXISTS.msg, Object.keys(err.keyValue).toString());
    err = new BadRequestError(message);
  }

  // Wrong JWT error
  if (err.name === 'JsonWebTokenError') {
    const message = req.translate(Message.TOKEN_IS_INVALID_TRY_AGAIN.msg);
    err = new BadRequestError(message);
  }

  // JWT EXPIRE error
  if (err.name === 'TokenExpiredError') {
    const message = req.translate(Message.TOKEN_IS_EXPIRED_TRY_AGAIN.msg);
    err = new BadRequestError(message);
  }

  // Xóa ảnh ở local nếu gặp lỗi xảy ra
  try {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  } catch (_) {}

  res.status(err.statusCode).json({
    status: 'error',
    ec: err.ec,
    message: err.message
  });
}
