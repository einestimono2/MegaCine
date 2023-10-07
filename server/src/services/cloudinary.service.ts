import fs from 'fs';

import { ErrorHandler } from '../utils';
import { cloudinary } from '../config';
import { type CloudinaryResponse } from '../interfaces';
import { Message, HttpStatusCode } from '../constants';

export const replaceAvatar = async (imgID: string | null, file: string): Promise<CloudinaryResponse> => {
  if (imgID) await destroy(imgID);

  return await uploadAvatar(file);
};

export const uploadAvatar = async (file: string): Promise<CloudinaryResponse> => {
  const myCloud = await cloudinary.uploader.upload(file, {
    folder: 'MegaCine/avatars',
    width: 150,
    crop: 'scale'
  });

  if (!myCloud) {
    throw new ErrorHandler(Message.UPLOAD_FAILED, HttpStatusCode.BAD_REQUEST_400);
  }

  // Xóa ảnh ở folder uploads
  fs.unlinkSync(file);

  return {
    public_id: myCloud.public_id,
    url: myCloud.secure_url
  };
};

export const destroy = async (id?: string) => {
  if (!id) return;

  await cloudinary.uploader.destroy(id);
};

export const resizeImage = (id: string, h: number, w: number) => {
  if (!id) return;

  return cloudinary.url(id, {
    height: h,
    width: w,
    crop: 'scale'
  });
};
