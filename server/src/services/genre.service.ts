import { type Request } from 'express';
import { isValidObjectId } from 'mongoose';

import { GenreModel } from '../models';
import { type IGenre } from '../interfaces';
import { HttpStatusCode, Message } from '../constants';
import { ErrorHandler, convertRequestToPipelineStages } from '../utils';

export const createGenre = async (genre: IGenre) => {
  const checkGenre = await GenreModel.findOne({ name: genre.name });

  if (!checkGenre) {
    if (genre.name && typeof genre.name === 'string') {
      try {
        genre.name = JSON.parse(genre.name);
      } catch (_) {}
    }

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

export const updateGenre = async (id: string, name: any) => {
  let genre = await getGenreById(id);
  let newName = name;

  // Convert về object nếu nó đang ở dạng string
  if (newName && typeof newName === 'string') {
    try {
      newName = JSON.parse(name);
    } catch (_) {}
  }

  if (genre.name !== newName) {
    genre.name = newName;

    genre = await genre.save();
  }

  return genre;
};
