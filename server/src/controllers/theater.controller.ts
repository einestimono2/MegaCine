import { type NextFunction, type Request, type Response } from 'express';

import { CatchAsyncError } from '../middlewares';
import { theaterServices } from '../services';

//! Add Theater
export const createTheater = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const theater = await theaterServices.createTheater(
    { ...req.body },
    req.userPayload,
    req.files as Record<string, Express.Multer.File[]>
  );

  res.sendCREATED({
    data: theater
  });
});

export const deleteTheater = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  await theaterServices.deleteTheater(req.params.id, req.userPayload?.id);

  res.sendOK();
});

export const updateTheater = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const files = req.files as Record<string, Express.Multer.File[]>;

  const logo = files.logo?.at(0)?.path;
  let images: string[] | undefined;
  if (files.images?.length) {
    images = [];

    for (const image of files.images) {
      images.push(image.path);
    }
  }

  const theater = await theaterServices.updateTheater(req.params.id, { ...req.body, logo, images });

  res.sendCREATED({
    data: theater
  });
});

export const getTheaterDetails = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const theater = await theaterServices.getTheaterDetails(req.params.id, req.getLocale());

  res.sendOK({
    data: theater
  });
});

export const getTheaters = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const [payload] = await theaterServices.getTheaters(req); // [ { extra: {}, data: [] } ]

  res.sendOK({
    data: payload?.data ?? [],
    extra: payload?.extra ?? { totalCount: 0 }
  });
});

export const getNearByTheaters = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const payload = await theaterServices.getNearbyTheaters(req.body.longitude, req.body.latitude);

  res.sendOK({
    data: payload
  });
});
