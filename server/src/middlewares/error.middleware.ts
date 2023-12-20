import { type NextFunction, type Request, type Response } from 'express';

import logger, { unlinkRequestFile, unlinkRequestFiles } from '../utils';
import { HttpStatusCode, Message } from '../constants';
import { ConflictError, NotFoundError, UnauthorizedError, UnprocessableEntityError } from '../models';

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
      message = eval(`req.translate(${firstError})`); // Trường hợp có thêm value kèm
    } catch (error: any) {
      message = req.translate(firstError); // Trường hợp chỉ có key
    }

    err = new UnprocessableEntityError(message);
  }

  // Error: Wrong id in mongoDB
  if (err.name === 'CastError') {
    const message = req.translate(Message.RESOURCE_NOT_FOUND_INVALID_s.msg, err.path);
    err = new UnprocessableEntityError(message);
  }

  // Error: Duplicate key in mongoDB
  if (err.code === 11000) {
    const message = req.translate(
      Message.s_ALREADY_EXISTS.msg,
      `'${Object.keys(err.keyValue).toString()}:${Object.values(err.keyValue).toString()}'`
    );
    err = new ConflictError(message);
  }

  // Wrong JWT error
  if (err.name === 'JsonWebTokenError') {
    const message = req.translate(Message.TOKEN_IS_INVALID_TRY_AGAIN.msg);
    err = new UnauthorizedError(message);
  }

  // JWT EXPIRE error
  if (err.name === 'TokenExpiredError') {
    const message = req.translate(Message.TOKEN_IS_EXPIRED_TRY_AGAIN.msg);
    err = new UnauthorizedError(message);
  }

  // File not exist
  if (err.code === 'ENOENT') {
    next(new NotFoundError(Message.FILE_NOT_FOUND));
    return;
  }

  // Xóa ảnh ở local nếu chưa bị xóa khi gặp lỗi
  unlinkRequestFile(req.file);
  unlinkRequestFiles(req.files);

  res.status(err.statusCode).json({
    status: 'error',
    ec: err.ec,
    message: err.message
  });
}
