/* eslint-disable @typescript-eslint/naming-convention */

import { cloudinary } from '../config';
import { Message } from '../constants';
import { BadRequestError } from '../models';
// import { unlinkFileFromPath } from '../utils';

/*
  Sử dụng public_id của image là mongodb ID luôn
  --> Khi up ảnh cùng public_id thì sẽ override ảnh trc đó có cùng public_id
  --> Update thuận tiện hơn (Không cần xóa cũ, up mới mà chỉ cần up mới luôn)
*/

export const replaceImage = async ({
  imgID,
  public_id,
  file,
  folder
}: {
  imgID: string | null | undefined;
  public_id: string | undefined;
  file: string;
  folder: string;
}): Promise<string> => {
  if (imgID) await destroy({ folder, public_id: public_id! });

  return await uploadImage({ file, folder, public_id });
};

export const uploadImage = async ({
  public_id,
  file,
  folder
}: {
  public_id: string | undefined;
  file: string;
  folder: string;
}): Promise<string> => {
  try {
    const myCloud = await cloudinary.uploader.upload(file, {
      public_id,
      folder: `MegaCine/${folder}`,
      width: 150,
      crop: 'scale'
    });

    // Xóa ảnh ở folder uploads
    // unlinkFileFromPath(file);

    return myCloud.secure_url;
  } catch (_) {
    throw new BadRequestError(Message.UPLOAD_FAILED);
  }
};

export const destroy = async ({ public_id, folder }: { public_id: string; folder: string }) => {
  await cloudinary.uploader.destroy(`MegaCine/${folder}/${public_id}`);
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
