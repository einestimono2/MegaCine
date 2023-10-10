import { type NextFunction, type Request, type Response } from 'express';

import { CatchAsyncError } from '../middlewares';
import { genreServices } from '../services';
import { HttpStatusCode } from '../constants';

// Create a new genre
export const createGenre = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const genre = await genreServices.createGenre({ ...req.body });

  res.status(HttpStatusCode.OK_200).json({
    status: 'success',
    data: { genre }
  });
});

// Get all genres
export const getGenres = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const [payload] = await genreServices.getGenres(req); // [ { extra: {}, data: [] } ]

  res.status(HttpStatusCode.OK_200).json({
    status: 'success',
    data: {
      extra: payload?.extra ?? { totalCount: 0 },
      genres: payload?.data ?? []
    }
  });
});

// Get name of genre
export const getGenre = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const genre = await genreServices.getGenreById(id);

  res.status(HttpStatusCode.OK_200).json({
    status: 'success',
    data: { genre }
  });
});

// Update Genre
export const updateGenre = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const name = req.body.name;

  let genre = await genreServices.getGenreById(id);

  if (genre.name !== name) {
    genre.name = name;

    genre = await genre.save();
  }

  res.status(HttpStatusCode.OK_200).json({
    status: 'success',
    data: { genre }
  });
});

// Delete Genre
export const deleteGenre = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  await genreServices.deleteGenre(id);

  res.status(HttpStatusCode.OK_200).json({
    status: 'success'
  });
});
