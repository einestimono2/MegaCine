import { type NextFunction, type Request, type Response } from 'express';

import { CatchAsyncError } from '../middlewares';
import { personServices } from '../services';

//! Add Person
export const createPerson = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const person = await personServices.createPerson({ ...req.body });

  res.sendCREATED({
    data: person
  });
});

//! Update Person
export const updatePerson = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const person = await personServices.updatePerson(req.params.id, { ...req.body });

  res.sendCREATED({
    data: person
  });
});

//! Delete Person
export const deletePerson = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  await personServices.deletePerson(req.params.id);

  res.sendOK();
});

//! Get Person Info
export const getPerson = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const person = await personServices.getPersonDetails(req.params.id, req.getLocale());

  res.sendOK({
    data: person
  });
});

//! Get List Person
export const getPersons = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const [payload] = await personServices.getPersons(req); // [ { extra: {}, data: [] } ]

  res.sendOK({
    data: payload?.data ?? [],
    extra: payload?.extra ?? { totalCount: 0 }
  });
});
