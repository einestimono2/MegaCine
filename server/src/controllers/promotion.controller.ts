import { type NextFunction, type Request, type Response } from 'express';

import { CatchAsyncError } from '../middlewares';
import { promotionServices } from '../services';

export const createPromotion = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const promotion = await promotionServices.createPromotion({ ...req.body, theater: req.userPayload?.theater });

  res.sendCREATED({
    data: promotion
  });
});

export const updatePromotion = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const promotion = await promotionServices.updatePromotion(req.params.id, req.body, req.userPayload?.theater);

  res.sendCREATED({
    data: promotion
  });
});

export const deletePromotion = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  await promotionServices.deletePromotion(req.params.id);

  res.sendOK();
});

export const getPromotionDetails = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  res.sendOK({
    data: await promotionServices.getPromotionDetails(req.params.id)
  });
});

export const getPromotionsByTheater = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  res.sendOK({
    data: await promotionServices.getPromotionsByTheater(req.params.id)
  });
});

export const getMyTheaterPromotions = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  res.sendOK({
    data: await promotionServices.getMyTheaterPromotions(req.userPayload?.theater)
  });
});
