import { type Request } from 'express';
import { isValidObjectId } from 'mongoose';

import { GenreModel, NotFoundError } from '../models';
import { type IGenre } from '../interfaces';
import { Message } from '../constants';
import { convertRequestToPipelineStages } from '../utils';

export const createGenre = async (genre: IGenre) => {
  let name = genre.name;
  if (genre.name && typeof genre.name === 'string') {
    try {
      name = JSON.parse(genre.name);
    } catch (_) {}
  }

  const _genre = await GenreModel.findOneAndUpdate(
    { name: genre.name },
    { $setOnInsert: { name } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return _genre;
};

export const getOrCreateGenre = async (key: string) => {
  let id: string = key;

  if (!isValidObjectId(key)) {
    const genre = await GenreModel.findOneAndUpdate(
      { $or: [{ 'name.en': key }, { 'name.vi': key }] },
      {
        $setOnInsert: {
          name: {
            en: key,
            vi: key
          }
        }
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    id = genre._id;
  }

  return id;
};

export const getGenres = async (req: Request) => {
  const options = convertRequestToPipelineStages({ req, fieldsApplySearch: ['name'], localizationFields: ['name'] });

  return await GenreModel.aggregate(options);
};

export const getGenreById = async (id: string, lang?: string) => {
  let options: any | object = null;
  if (lang) options = { name: `$name.${lang}` };

  const genre = await GenreModel.findById(id, options);
  if (!genre) {
    throw new NotFoundError(Message.GENRE_NOT_FOUND);
  }

  return genre;
};

export const deleteGenre = async (id: string) => {
  return await GenreModel.findByIdAndDelete(id);
};

export const updateGenre = async (id: string, name: any) => {
  let newName = name;
  // Convert về object nếu nó đang ở dạng string
  if (newName && typeof newName === 'string') {
    try {
      newName = JSON.parse(name);
    } catch (_) {}
  }

  const genre = await GenreModel.findByIdAndUpdate(id, { name: newName }, { new: true });
  if (!genre) throw new NotFoundError(Message.GENRE_NOT_FOUND);

  return genre;
};
