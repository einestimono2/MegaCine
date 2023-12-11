import { type Request, type Response, type NextFunction } from 'express';

import { CatchAsyncError } from '../middlewares';
import { reviewServices } from '../services';

export const createOrUpdateReview = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const review = await reviewServices.createOrUpdateReview({ ...req.body, user: req.userPayload?.id });

  res.sendCREATED({
    data: review
  });
});

export const getReviewsByMovie = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const [payload] = await reviewServices.getReviewsByMovie(req);

  res.sendOK({
    data: payload?.data ?? [],
    extra: payload?.extra ?? { totalCount: 0 }
  });
});

export const getReviewsByTheater = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const [payload] = await reviewServices.getReviewsByTheater(req);

  res.sendOK({
    data: payload?.data ?? [],
    extra: payload?.extra ?? { totalCount: 0 }
  });
});

export const deleteReview = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  await reviewServices.deleteReview(req.params.id);

  res.sendOK();
});

export const toggleActiveReview = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  await reviewServices.toggleActiveReview(req.params.id);

  res.sendOK();
});
