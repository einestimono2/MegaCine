import { type NextFunction, type Request, type Response } from 'express';

import { CatchAsyncError } from '../middlewares';
import { HttpStatusCode } from '../constants';
import { personServices, cloudinaryServices } from '../services';
import { type IUpdatePersonRequest, type ICloudinaryFile } from '../interfaces';

//! Add Person
export const createPerson = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  let avatar: ICloudinaryFile | null = null;

  // Upload avatar nếu có
  if (req.file) {
    avatar = await cloudinaryServices.uploadAvatar(req.file.path);
  }

  const person = await personServices.createPerson({ ...req.body, avatar });

  res.status(HttpStatusCode.OK_200).json({
    status: 'success',
    data: { person }
  });
});

//! Update Person
export const updatePerson = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const { fullName, summary } = req.body as IUpdatePersonRequest;

  const person = await personServices.getPersonById(id);

  if (fullName) person.fullName = fullName;
  if (summary) person.summary = summary;
  if (req.file) person.avatar = await cloudinaryServices.replaceAvatar(person.avatar.public_id, req.file.path);

  await person.save();

  res.status(HttpStatusCode.OK_200).json({
    status: 'success',
    data: { person }
  });
});

//! Delete Person
export const deletePerson = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const person = await personServices.getPersonById(req.params.id);

  // Xóa ảnh trên cloudinary
  await cloudinaryServices.destroy(person.avatar.public_id);

  await person.deleteOne();

  res.status(HttpStatusCode.OK_200).json({
    status: 'success'
  });
});

//! Get Person Info
export const getPerson = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const person = await personServices.getPersonById(req.params.id);

  res.status(HttpStatusCode.OK_200).json({
    status: 'success',
    data: { person }
  });
});

//! Get List Person
export const getPersons = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const [payload] = await personServices.getPersons(req); // [ { extra: {}, data: [] } ]

  res.status(HttpStatusCode.OK_200).json({
    status: 'success',
    data: {
      extra: payload?.extra ?? { totalCount: 0 },
      persons: payload?.data ?? []
    }
  });
});
