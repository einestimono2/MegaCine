import { GenreModel } from '../models';
import { type Request } from 'express';
import { type IGenre } from '..//interfaces';
import { HttpStatusCode, Message } from '../constants';
import { ErrorHandler, translateQueryRequest } from '../utils';

export const createGenre = async (genre: IGenre) => {
  const check_genre = await GenreModel.findOne({ name: genre.name });
  if (!check_genre) {
    const newGenre = new GenreModel(genre);
    return await newGenre.save();
  } else {
    return check_genre;
  }
};

export const getGenres = async (req: Request) => {
  const options = translateQueryRequest(req, 'name');
  return await GenreModel.aggregate(options);
};

export const getGenreById = async (id: string) => {
  const genre = await GenreModel.findById(id);
  if (!genre) {
    throw new ErrorHandler(Message.GENRE_NOT_FOUND, HttpStatusCode.NOT_FOUND_404);
  }
  return genre;
};

// export const updateGenre = async (data: any) => {
//   const { genreId, update } = data;
//   const updateGenre = await GenreModel.findOneAndUpdate({ id: genreId }, update, {
//     new: true
//   });
//   return updateGenre;
//};

export const deleteGenre = async (id: string) => {
  return await GenreModel.findByIdAndDelete(id);
};
