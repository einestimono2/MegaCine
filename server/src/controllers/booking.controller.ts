import { type NextFunction, type Request, type Response } from 'express';

import { CatchAsyncError } from '../middlewares';
import { bookingServices } from '../services';

export const createBooking = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const booking = await bookingServices.createBooking({ ...req.body, user: req.userPayload?.id });

  res.sendCREATED({
    data: booking
  });
});

export const deleteBooking = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  await bookingServices.deleteBooking(req.params.id);

  res.sendOK();
});

export const getBookingDetails = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const booking = await bookingServices.getBookingDetails(req.params.id);

  res.sendOK({
    data: booking
  });
});

export const getBookingsByUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const [payload] = await bookingServices.getBookingsByUser(req);

  res.sendOK({
    data: payload?.data ?? [],
    extra: payload?.extra ?? { totalCount: 0 }
  });
});

export const getBookingsByTheater = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const [payload] = await bookingServices.getBookingsByTheater(req);

  res.sendOK({
    data: payload?.data ?? [],
    extra: payload?.extra ?? { totalCount: 0 }
  });
});

export const getBookings = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const [payload] = await bookingServices.getBookings(req);

  res.sendOK({
    data: payload?.data ?? [],
    extra: payload?.extra ?? { totalCount: 0 }
  });
});
