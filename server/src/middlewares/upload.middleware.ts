import multer, { type FileFilterCallback } from 'multer';
import path from 'path';

import { HttpStatusCode, Message } from './../constants';
import { avatarAccepted } from '../constants';
import { ErrorHandler } from '../utils';

const multerStorage = multer.diskStorage({
  destination(_req, _file, callback) {
    callback(null, path.join(__dirname, '../uploads'));
  },
  filename(_req, file, callback) {
    const uniqueSuffix = Math.floor(Math.random() * 1e9).toString(36);
    const fileNames = file.originalname.split('.');
    const validName = fileNames[0]
      .toLowerCase()
      .replace(/[^a-z0-9-_\s]/g, '')
      .replace(/\s+/g, '_')
      .substring(0, 50);

    callback(null, validName + '_' + uniqueSuffix + '.' + fileNames[fileNames.length - 1]);
  }
});

const imageFilter = (_req: Express.Request, file: Express.Multer.File, callback: FileFilterCallback) => {
  if (avatarAccepted.fileTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new ErrorHandler(Message.UNSUPPORTED_IMAGE_FORMAT, HttpStatusCode.UNSUPPORTED_MEDIA_TYPE_415));
  }
};

export const uploadAvatar = multer({
  storage: multerStorage,
  fileFilter: imageFilter,
  limits: { fileSize: avatarAccepted.fileMaxSize }
});
