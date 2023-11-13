import { cloudinary } from '../config';
import { type CloudinaryResponse } from '../interfaces';
import { Message } from '../constants';
import { BadRequestError } from '../models';
import { unlinkFileFromPath } from '../utils';

export const replaceImage = async (
  imgID: string | null,
  file: string,
  folder: string
): Promise<CloudinaryResponse> => {
  if (imgID) await destroy(imgID);

  return await uploadImage(file, folder);
};

export const uploadImage = async (file: string, folder: string): Promise<CloudinaryResponse> => {
  const myCloud = await cloudinary.uploader.upload(file, {
    folder: `MegaCine/${folder}`,
    width: 150,
    crop: 'scale'
  });

  if (!myCloud) {
    throw new BadRequestError(Message.UPLOAD_FAILED);
  }

  // Xóa ảnh ở folder uploads
  unlinkFileFromPath(file);

  return {
    public_id: myCloud.public_id,
    url: myCloud.secure_url
  };
};

export const destroy = async (id?: string) => {
  if (!id) return;

  await cloudinary.uploader.destroy(id);
};

export const resizeImage = (id: string, height: number, width: number, format: string = 'jpg') => {
  if (!id) return;

  return cloudinary.url(id, {
    height,
    width,
    format,
    crop: 'scale'
  });
};
