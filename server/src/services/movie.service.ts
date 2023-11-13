import { type Request } from 'express';
import { type Types } from 'mongoose';

import { Message } from '../constants';
import { type IPerson, type IMovie, type IUpdateMovieRequest } from '../interfaces';
import { MovieModel, NotFoundError } from '../models';
import { convertRequestToPipelineStages, convertToMongooseId } from '../utils';
import { cloudinaryServices, personServices, genreServices } from './';

export const createMovie = async (movie: IMovie, poster: string | undefined) => {
  // Lưu lại list person để gán id của phim đó vào
  const persons: Array<IPerson & { _id: Types.ObjectId }> = [];

  // Tạo person model nếu nhập tên
  //! forEach có thể k await được
  for (let i = 0; i < movie.directors.length; i++) {
    const person = await personServices.getOrCreatePerson(movie.directors[i] as string);
    movie.directors[i] = person._id;
    persons.push(person);
  }

  for (let i = 0; i < movie.actors.length; i++) {
    const person = await personServices.getOrCreatePerson(movie.actors[i] as string);
    movie.actors[i] = person._id;
    persons.push(person);
  }

  // Tạo mới nếu nhập tên
  for (let i = 0; i < movie.genres.length; i++) {
    movie.genres[i] = await genreServices.getOrCreateGenre(movie.genres[i] as string);
  }

  // Convert --> Object
  if (movie.overview && typeof movie.overview === 'string') {
    try {
      movie.overview = JSON.parse(movie.overview);
    } catch (_) {}
  }

  if (movie.language && typeof movie.language === 'string') {
    try {
      movie.language = JSON.parse(movie.language);
    } catch (_) {}
  }

  if (poster) {
    movie.poster = await cloudinaryServices.uploadImage(poster, 'posters');
  }

  const newMovie = new MovieModel(movie);

  for (let i = 0; i < persons.length; i++) {
    if (!persons[i].movies.includes(newMovie._id)) {
      persons[i].movies.push(newMovie._id);
      await persons[i].save();
    }
  }

  return await newMovie.save().catch(async (err) => {
    await cloudinaryServices.destroy(movie.poster.public_id); // Xóa ảnh

    throw err;
  });
};

export const updateMovie = async (id: string, newMovie: IUpdateMovieRequest) => {
  const movie = await getMovieById(id);

  if (newMovie.poster)
    movie.poster = await cloudinaryServices.replaceImage(movie.poster.public_id, newMovie.poster, 'posters');
  if (newMovie.overview) {
    try {
      movie.overview = JSON.parse(newMovie.overview);
    } catch (_) {}
  }
  if (newMovie.language) {
    try {
      movie.language = JSON.parse(newMovie.language);
    } catch (_) {}
  }

  if (newMovie.title) movie.title = newMovie.title;
  if (newMovie.originalTitle) movie.originalTitle = newMovie.originalTitle;
  if (newMovie.trailer) movie.trailer = newMovie.trailer;
  if (newMovie.duration) movie.duration = newMovie.duration;
  if (newMovie.releaseDate) movie.releaseDate = newMovie.releaseDate;
  if (newMovie.directors) movie.directors = newMovie.directors.split(',');
  if (newMovie.actors) movie.actors = newMovie.actors.split(',');
  if (newMovie.ageType) movie.ageType = newMovie.ageType;
  if (newMovie.type) movie.type = newMovie.type;
  if (newMovie.genres) movie.genres = newMovie.genres.split(',');

  await movie.save();

  return movie;
};

export const getMovieById = async (id: string) => {
  const movie = await MovieModel.findById(id);
  if (!movie) {
    throw new NotFoundError(Message.MOVIE_NOT_FOUND);
  }

  return movie;
};

export const getMovieDetails = async (id: string, lang: string) => {
  const [movie] = await MovieModel.aggregate([
    { $match: { _id: convertToMongooseId(id) } },
    {
      $set: {
        overview: `$overview.${lang}`,
        language: `$language.${lang}`
      }
    },
    {
      $lookup: {
        from: 'people',
        localField: 'directors',
        foreignField: '_id',
        as: 'directors',
        pipeline: [{ $project: { _id: 1, fullName: 1, avatar: '$avatar.url' } }]
      }
    },
    {
      $lookup: {
        from: 'genres',
        localField: 'genres',
        foreignField: '_id',
        as: 'genres',
        pipeline: [{ $project: { _id: 1, name: `$name.${lang}` } }]
      }
    },
    {
      $lookup: {
        from: 'people',
        localField: 'actors',
        foreignField: '_id',
        as: 'actors',
        pipeline: [{ $project: { _id: 1, fullName: 1, avatar: '$avatar.url' } }]
      }
    }
  ]);
  if (!movie) {
    throw new NotFoundError(Message.MOVIE_NOT_FOUND);
  }

  return movie;
};

export const getMovies = async (req: Request) => {
  const options = convertRequestToPipelineStages({
    req,
    fieldsApplySearch: ['title', 'originalTitle'],
    localizationFields: ['overview', 'language']
  });

  return await MovieModel.aggregate(options);

  // const populates = [
  //   { $lookup: { from: 'people', localField: 'directors', foreignField: '_id', as: 'directors' } },
  //   { $lookup: { from: 'genres', localField: 'genres', foreignField: '_id', as: 'genres' } },
  //   { $lookup: { from: 'people', localField: 'actors', foreignField: '_id', as: 'actors' } }
  // ];
  // return await MovieModel.aggregate(populates).append(options);

  // Nối bảng
  // const movies = await MovieModel.aggregate(options);
  // await GenreModel.populate(movies, { path: 'data.genres', select: { _id: 1, name: `$name.${req.getLocale()}` } });
  // await PersonModel.populate(movies, {
  //   path: 'data.actors data.directors',
  //   select: { _id: 1, fullName: 1, avatar: '$avatar.url' }
  // });

  // return movies;
};

export const deleteMovie = async (id: string) => {
  const movie = await getMovieById(id);

  // Xóa ảnh trên cloudinary
  await cloudinaryServices.destroy(movie.poster.public_id);

  // Xóa movie id của từng diễn viên
  for (let i = 0; i < movie.directors.length; i++) {
    await personServices.deleteMovieFromPerson(movie.directors[i] as string, movie._id);
  }
  for (let i = 0; i < movie.actors.length; i++) {
    await personServices.deleteMovieFromPerson(movie.actors[i] as string, movie._id);
  }

  // TODO: Xóa id rạp tương ứng or lúc api trả lại phim k tồn tại

  await movie.deleteOne();
};
