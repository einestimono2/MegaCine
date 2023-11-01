import multer, { type FileFilterCallback } from 'multer';
import path from 'path';

import { Message } from './../constants';
import { avatarAccepted } from '../constants';
import { UnsupportedMediaTypeError } from '../models';

const memoryStorage = multer.memoryStorage();

const diskStorage = multer.diskStorage({
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
    callback(new UnsupportedMediaTypeError(Message.UNSUPPORTED_IMAGE_FORMAT));
  }
};

export const uploadImage = multer({
  storage: diskStorage,
  fileFilter: imageFilter,
  limits: { fileSize: avatarAccepted.fileMaxSize }
});

export const uploadMemory = multer({ storage: memoryStorage });
