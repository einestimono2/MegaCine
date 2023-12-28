import { type NextFunction, type Request, type Response } from 'express';

import { CatchAsyncError } from '../middlewares';
import { reportServices } from '../services';

export const getRevenueOverview = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const data = await reportServices.getRevenueOverview(req);

  res.sendOK({ data });
});

export const getRevenueByYear = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const data = await reportServices.getRevenueByYear(req);

  res.sendOK({ data });
});

export const getRevenueByTheater = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const data = await reportServices.getRevenueByTheater(req);

  res.sendOK({ data });
});

export const getRevenueByMovie = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const data = await reportServices.getRevenueByMovie(req);

  res.sendOK({ data });
});

export const getRevenueByProduct = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const data = await reportServices.getRevenueByProduct(req);

  res.sendOK({ data });
});
