import { type NextFunction, type Request, type Response } from 'express';

import { CatchAsyncError } from '../middlewares';
import { movieServices } from '../services';

//! Create a movie
export const createMovie = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const movie = await movieServices.createMovie({ ...req.body });

  res.sendCREATED({
    data: movie
  });
});

//! Danh sách phim
export const getMovies = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const [payload] = await movieServices.getMovies(req); // [ { extra: {}, data: [] } ]

  res.sendOK({
    data: payload?.data ?? [],
    extra: payload?.extra ?? { totalCount: 0 }
  });
});

//! Phim đang chiếu
export const getNowShowingMovies = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const [payload] = await movieServices.getNowShowingMovies(req); // [ { extra: {}, data: [] } ]

  res.sendOK({
    data: payload?.data ?? [],
    extra: payload?.extra ?? { totalCount: 0 }
  });
});

//! Phim sắp chiếu
export const getComingSoonMovies = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const [payload] = await movieServices.getComingSoonMovies(req); // [ { extra: {}, data: [] } ]

  res.sendOK({
    data: payload?.data ?? [],
    extra: payload?.extra ?? { totalCount: 0 }
  });
});

//! Phim chiếu sớm
export const getSneakShowMovies = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const movies = await movieServices.getSneakShowMovies(req); // [ { extra: {}, data: [] } ]

  res.sendOK({
    data: movies
  });
});

//! Phim đánh giá cao
export const getMostRateMovies = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const movies = await movieServices.getMostRateMovies(req);

  res.sendOK({
    data: movies
  });
});

//! Movie details
export const getMovieDetails = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const movie = await movieServices.getMovieDetails(req.params.id, req.getLocale());

  res.sendOK({
    data: movie
  });
});

//! Update movie
export const updateMovie = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const newMovie = await movieServices.updateMovie(req.params.id, { ...req.body });

  res.sendCREATED({
    data: newMovie
  });
});

//! Delete Genre
export const deleteMovie = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  await movieServices.deleteMovie(req.params.id);

  res.sendOK();
});
