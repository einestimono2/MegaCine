import { type NextFunction, type Request, type Response } from 'express';

import { CatchAsyncError } from '../middlewares';
import { fareServices } from '../services';

// Create a new Fare
export const createFare = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const fare = await fareServices.createFare({ ...req.body, theater: req.userPayload?.theater });

  res.sendCREATED({
    data: fare
  });
});

// Get fare of theater
export const getFareByTheater = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const fare = await fareServices.getFareByTheater(req.params.id, req.getLocale());

  res.sendOK({
    data: fare ?? {}
  });
});

// Update Fare
export const updateFare = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const fare = await fareServices.updateFare(req.params.id, req.body);

  res.sendCREATED({
    data: fare
  });
});

// Delete Fare
export const deleteFare = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  await fareServices.deleteFare(req.params.id);

  res.sendOK();
});
