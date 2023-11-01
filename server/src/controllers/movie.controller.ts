import { type NextFunction, type Request, type Response } from 'express';

import { CatchAsyncError } from '../middlewares';
import { movieServices } from '../services';

//! Create a movie
export const createMovie = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  req.body.directors = req.body.directors.split(',');
  req.body.actors = req.body.actors.split(',');
  req.body.genres = req.body.genres.split(',');

  const movie = await movieServices.createMovie({ ...req.body }, req.file?.path);

  res.sendCREATED({
    data: movie
  });
});

//! List movies
export const getMovies = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const [payload] = await movieServices.getMovies(req); // [ { extra: {}, data: [] } ]

  res.sendOK({
    data: payload?.data ?? [],
    extra: payload?.extra ?? { totalCount: 0 }
  });
});

//! Movie details
export const getMovie = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const movie = await movieServices.getMovieDetails(req.params.id, req.getLocale());

  res.sendOK({
    data: movie
  });
});

//! Update movie
export const updateMovie = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const newMovie = await movieServices.updateMovie(req.params.id, { ...req.body, poster: req.file?.path });

  res.sendCREATED({
    data: newMovie
  });
});

//! Delete Genre
export const deleteMovie = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  await movieServices.deleteMovie(req.params.id);

  res.sendOK();
});
