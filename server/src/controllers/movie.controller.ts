import { type NextFunction, type Request, type Response } from 'express';

import { CatchAsyncError } from '../middlewares';
import { movieServices } from '../services';
import { HttpStatusCode } from '../constants';

//! Create a movie
export const createMovie = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  req.body.directors = req.body.directors.split(',');
  req.body.actors = req.body.actors.split(',');
  req.body.genres = req.body.genres.split(',');

  const movie = await movieServices.createMovie(
    { ...req.body, theater: req.userPayload?.theater ?? '-' },
    req.file?.path
  );

  res.status(HttpStatusCode.CREATED_201).json({
    status: 'success',
    data: { movie }
  });
});

//! List movies
export const getMovies = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const [payload] = await movieServices.getMovies(req); // [ { extra: {}, data: [] } ]

  res.status(HttpStatusCode.OK_200).json({
    status: 'success',
    data: {
      extra: payload?.extra ?? { totalCount: 0 },
      movies: payload?.data ?? []
    }
  });
});

//! Movie details
export const getMovie = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const movie = await movieServices.getMovieDetails(req.params.id, req.getLocale());

  res.status(HttpStatusCode.OK_200).json({
    status: 'success',
    data: { movie }
  });
});

//! Update movie
export const updateMovie = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const newMovie = await movieServices.updateMovie(req.params.id, { ...req.body, poster: req.file?.path });

  res.status(HttpStatusCode.CREATED_201).json({
    status: 'success',
    data: { movie: newMovie }
  });
});

//! Delete Genre
export const deleteMovie = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  await movieServices.deleteMovie(req.params.id);

  res.status(HttpStatusCode.OK_200).json({
    status: 'success'
  });
});
