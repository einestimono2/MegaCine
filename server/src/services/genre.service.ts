import { type Request } from 'express';

import { GenreModel } from '../models';
import { type IGenre } from '../interfaces';
import { HttpStatusCode, Message } from '../constants';
import { ErrorHandler, convertRequestToPipelineStages } from '../utils';
import { isValidObjectId } from 'mongoose';

export const createGenre = async (genre: IGenre) => {
  const checkGenre = await GenreModel.findOne({ name: genre.name });

  if (!checkGenre) {
    const newGenre = new GenreModel(genre);
    return await newGenre.save();
  }

  return checkGenre;
};

export const getOrCreateGenre = async (key: string) => {
  let id: string = key;

  if (!isValidObjectId(key)) {
    let genre = (
      await GenreModel.find({
        $or: [{ 'name.en': key }, { 'name.vi': key }]
      })
    )[0];

    if (!genre) {
      genre = await new GenreModel({
        name: {
          en: key,
          vi: key
        }
      }).save();
    }

    id = genre._id;
  }

  return id;
};

export const getGenres = async (req: Request) => {
  const options = convertRequestToPipelineStages(req, ['name'], ['name']);

  return await GenreModel.aggregate(options);
};

export const getGenreById = async (id: string, lang?: string) => {
  let options: any | object = null;
  if (lang) options = { name: `$name.${lang}` };

  const genre = await GenreModel.findById(id, options);

  if (!genre) {
    throw new ErrorHandler(Message.GENRE_NOT_FOUND, HttpStatusCode.BAD_REQUEST_400);
  }

  return genre;
};

export const deleteGenre = async (id: string) => {
  return await GenreModel.findByIdAndDelete(id);
};
