import { type NextFunction, type Request, type Response } from 'express';

import { CatchAsyncError } from '../middlewares';
import { genreServices } from '../services';

// Create a new genre
export const createGenre = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const genre = await genreServices.createGenre({ ...req.body });

  res.sendCREATED({
    data: genre
  });
});

// Get all genres
export const getGenres = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const [payload] = await genreServices.getGenres(req); // [ { extra: {}, data: [] } ]

  res.sendOK({
    data: payload?.data ?? [],
    extra: payload?.extra ?? { totalCount: 0 }
  });
});

// Get name of genre
export const getGenre = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const genre = await genreServices.getGenreById(id, req.getLocale());

  res.sendOK({
    data: genre
  });
});

// Update Genre
export const updateGenre = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const genre = await genreServices.updateGenre(req.params.id, req.body.name);

  res.sendCREATED({
    data: genre
  });
});

// Delete Genre
export const deleteGenre = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  await genreServices.deleteGenre(req.params.id);

  res.sendOK();
});
