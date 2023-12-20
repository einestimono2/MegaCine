import { type NextFunction, type Request, type Response } from 'express';

import { CatchAsyncError } from '../middlewares';
import { showtimeServices } from '../services';

export const createShowtime = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const showtime = await showtimeServices.createShowtime({ ...req.body });

  res.sendCREATED({
    data: showtime
  });
});

export const updateShowtime = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const showtime = await showtimeServices.updateShowtime(req.params.id, { ...req.body });

  res.sendCREATED({
    data: showtime
  });
});

export const deleteShowtime = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  await showtimeServices.deleteShowtime(req.params.id);

  res.sendOK();
});

export const getShowtimeDetails = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const showtime = await showtimeServices.getShowtimeDetails(req.params.id);

  res.sendOK({
    data: showtime
  });
});

export const getShowtimesByMovie = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const [payload] = await showtimeServices.getShowtimesByMovie(req.params.id, req);

  res.sendOK({
    data: payload?.data ?? [],
    extra: payload?.extra ?? { totalCount: 0 }
  });
});

export const getShowtimesByTheater = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const [payload] = await showtimeServices.getShowtimesByTheater(req.params.id, req);

  res.sendOK({
    data: payload?.data ?? [],
    extra: payload?.extra ?? { totalCount: 0 }
  });
});
