import { type NextFunction, type Request, type Response } from 'express';

import { CatchAsyncError } from '../middlewares';
import { HttpStatusCode } from '../constants';
import { personServices } from '../services';

//! Add Person
export const createPerson = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const person = await personServices.createPerson({ ...req.body }, req.file?.path);

  res.status(HttpStatusCode.CREATED_201).json({
    status: 'success',
    data: { person }
  });
});

//! Update Person
export const updatePerson = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const person = await personServices.updatePerson(req.params.id, { ...req.body, avatar: req.file?.path });

  res.status(HttpStatusCode.CREATED_201).json({
    status: 'success',
    data: { person }
  });
});

//! Delete Person
export const deletePerson = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  await personServices.deletePerson(req.params.id);

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
