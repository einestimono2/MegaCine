import { type NextFunction, type Request, type Response } from 'express';
import { transpile } from 'typescript';

import logger, { ErrorHandler } from '../utils';
import { HttpStatusCode, Message } from '../constants';

export function ErrorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  logger.error(err.message);

  err.statusCode = err.statusCode ?? HttpStatusCode.INTERNAL_SERVER_ERROR_500;
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

    err = new ErrorHandler(message, HttpStatusCode.BAD_REQUEST_400);
  }

  // Error: Wrong id in mongoDB
  if (err.name === 'CastError') {
    const message = req.translate(Message.RESOURCE_NOT_FOUND_INVALID_s, err.path);
    err = new ErrorHandler(message, HttpStatusCode.BAD_REQUEST_400);
  }

  // Error: Duplicate key in mongoDB
  if (err.code === 11000) {
    const message = req.translate(Message.s_ALREADY_EXISTS, Object.keys(err.keyValue).toString());
    err = new ErrorHandler(message, HttpStatusCode.BAD_REQUEST_400);
  }

  // Wrong JWT error
  if (err.name === 'JsonWebTokenError') {
    const message = req.translate(Message.TOKEN_IS_INVALID_TRY_AGAIN);
    err = new ErrorHandler(message, HttpStatusCode.BAD_REQUEST_400);
  }

  // JWT EXPIRE error
  if (err.name === 'TokenExpiredError') {
    const message = req.translate(Message.TOKEN_IS_EXPIRED_TRY_AGAIN);
    err = new ErrorHandler(message, HttpStatusCode.BAD_REQUEST_400);
  }

  res.status(err.statusCode).json({
    status: 'error',
    message: err.message
  });
}
