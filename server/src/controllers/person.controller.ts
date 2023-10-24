import { type NextFunction, type Request, type Response } from 'express';

import { CatchAsyncError } from '../middlewares';
import { HttpStatusCode } from '../constants';
import { personServices, cloudinaryServices } from '../services';
import { type IUpdatePersonRequest, type ICloudinaryFile } from '../interfaces';

//! Add Person
export const createPerson = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  let avatar: ICloudinaryFile | null = null;

  if (req.body.summary && typeof req.body.summary === 'string') {
    try {
      req.body.summary = JSON.parse(req.body.summary);
    } catch (_) {
      req.body.summary = null;
    }
  }

  // Upload avatar nếu có
  if (req.file) {
    avatar = await cloudinaryServices.uploadImage(req.file.path, 'avatars');
  }

  const person = await personServices.createPerson({ ...req.body, avatar });

  res.status(HttpStatusCode.CREATED_201).json({
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
  if (summary) {
    try {
      person.summary = JSON.parse(summary);
    } catch (_) {}
  }
  if (req.file)
    person.avatar = await cloudinaryServices.replaceImage(person.avatar.public_id, req.file.path, 'avatars');

  await person.save();

  res.status(HttpStatusCode.CREATED_201).json({
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
  const person = await personServices.getPersonDetails(req.params.id, req.getLocale());

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
