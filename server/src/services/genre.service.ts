import { type Request } from 'express';

import { GenreModel } from '../models';
import { type IGenre } from '../interfaces';
import { HttpStatusCode, Message } from '../constants';
import { ErrorHandler, translateQueryRequest } from '../utils';

export const createGenre = async (genre: IGenre) => {
  const checkGenre = await GenreModel.findOne({ name: genre.name });

  if (!checkGenre) {
    const newGenre = new GenreModel(genre);
    return await newGenre.save();
  }

  return checkGenre;
};

export const getGenres = async (req: Request) => {
  const options = translateQueryRequest(req, 'name');

  return await GenreModel.aggregate(options);
};

export const getGenreById = async (id: string) => {
  const genre = await GenreModel.findById(id);

  if (!genre) {
    throw new ErrorHandler(Message.GENRE_NOT_FOUND, HttpStatusCode.BAD_REQUEST_400);
  }

  return genre;
};

export const deleteGenre = async (id: string) => {
  return await GenreModel.findByIdAndDelete(id);
};
