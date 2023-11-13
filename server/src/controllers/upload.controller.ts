import { type NextFunction, type Request, type Response } from 'express';
import fs from 'fs';

import { CatchAsyncError } from '../middlewares';
import { NotFoundError } from '../models';
import { Message } from '../constants';
import path from 'path';

// Upload Image
export const uploadImage = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    next(new NotFoundError(Message.FILE_EMPTY));
    return;
  }

  res.sendCREATED({
    data: {
      file: req.file.filename
    }
  });
});

// Upload many images
export const uploadImages = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.files?.length) {
    next(new NotFoundError(Message.FILE_EMPTY));
    return;
  }

  const files: string[] = [];
  const requestFiles = req.files as Express.Multer.File[];

  for (const file of requestFiles) {
    files.push(file.filename);
  }

  res.sendCREATED({
    data: files
  });
});

export const deleteImage = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  fs.unlink(path.join(__dirname, `../uploads/${req.params.fileName}`), (err: any) => {
    if (err !== null) {
      next(err);
      return;
    }

    res.sendOK();
  });
});
