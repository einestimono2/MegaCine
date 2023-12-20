import multer from 'multer';

import { avatarAccepted } from '../constants';
import { diskStorage, imageFilter, memoryStorage } from '../config/multer';

export const uploadImage = multer({
  storage: diskStorage,
  fileFilter: imageFilter,
  limits: { fileSize: avatarAccepted.fileMaxSize }
});

export const uploadMemory = multer({ storage: memoryStorage });
