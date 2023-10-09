import { CatchAsyncError } from '../middlewares';
import { genreServices } from '../services';
import { type NextFunction, type Request, type Response } from 'express';
import { HttpStatusCode, Message } from '../constants';
import { GenreModel } from '../models';
import { IGenre } from '../interfaces';

//Create a new genre
export const createGenre = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const genre = await genreServices.createGenre({ ...req.body });
  res.status(HttpStatusCode.OK_200).json({
    status: 'success',
    data: { genre }
  });
});

//Get all genres
export const getGenres = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const genres = await genreServices.getGenres(req);
  res.status(HttpStatusCode.OK_200).json({
    status: 'success',
    data: { genres }
  });
});

//Get name of genre
export const getGenre = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const genre = await genreServices.getGenreById(id);
  res.status(HttpStatusCode.OK_200).json({
    status: 'success',
    data: { genre }
  });
});

//Update Genre
export const updateGenre = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const name = req.body.name;

  const genre = await genreServices.getGenreById(id);
  if (genre.name !== name) {
    const genre = await GenreModel.updateOne({ _id: id }, { name: name });
    res.status(HttpStatusCode.OK_200).json({
      status: 'success',
      data: { genre }
    });
  } else {
    res.status(HttpStatusCode.BAD_REQUEST_400).json({
      status: 'false',
      message: 'Ten the loai da ton tai'
    });
  }
});

//Delete Genre
export const deleteGenre = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  await genreServices.deleteGenre(id);
  res.status(HttpStatusCode.OK_200).json({
    status: 'success'
  });
});
