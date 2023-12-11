import { type Request } from 'express';
import { type PipelineStage, type Types } from 'mongoose';
import dayjs from 'dayjs';

import { MOVIE_UPLOAD_FOLDER, Message } from '../constants';
import { type IPerson, type IMovie, type IUpdateMovieRequest } from '../interfaces';
import { MovieModel, NotFoundError } from '../models';
import { addPaginationPipelineStage, convertRequestToPipelineStages, convertToMongooseId } from '../utils';
import { cloudinaryServices, personServices, genreServices } from './';

export const createMovie = async (movie: IMovie) => {
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

  const newMovie = new MovieModel(movie);

  newMovie.poster = await cloudinaryServices.uploadImage({
    public_id: newMovie._id,
    file: movie.poster,
    folder: MOVIE_UPLOAD_FOLDER
  });

  for (let i = 0; i < persons.length; i++) {
    if (!persons[i].movies.includes(newMovie._id)) {
      persons[i].movies.push(newMovie._id);
      await persons[i].save();
    }
  }

  return await newMovie.save().catch(async (err) => {
    await cloudinaryServices.destroy({
      public_id: newMovie._id,
      folder: MOVIE_UPLOAD_FOLDER
    }); // Xóa ảnh

    throw err;
  });
};

export const updateMovie = async (id: string, newMovie: IUpdateMovieRequest) => {
  // Xóa thumbnail mới khỏi obj nếu có
  const poster = newMovie.poster;
  if (poster) delete newMovie.poster;

  const movie = await MovieModel.findByIdAndUpdate(id, newMovie, { new: true, runValidators: true });
  if (!movie) {
    throw new NotFoundError(Message.MOVIE_NOT_FOUND);
  }

  // Ghi đè ảnh cũ
  if (poster) {
    await cloudinaryServices.uploadImage({
      public_id: movie._id,
      file: poster,
      folder: MOVIE_UPLOAD_FOLDER
    });
  }

  return movie;
};

export const getMovieDetails = async (id: string, lang: string) => {
  const [movie] = await MovieModel.aggregate([
    { $match: { _id: convertToMongooseId(id) } },
    {
      $set: {
        overview: `$overview.${lang}`
      }
    },
    {
      $lookup: {
        from: 'people',
        localField: 'directors',
        foreignField: '_id',
        as: 'directors',
        pipeline: [{ $project: { _id: 1, fullName: 1, avatar: 1 } }]
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
        pipeline: [{ $project: { _id: 1, fullName: 1, avatar: 1 } }]
      }
    }
  ]);
  if (!movie) {
    throw new NotFoundError(Message.MOVIE_NOT_FOUND);
  }

  return movie;
};

export const getNowShowingMovies = async (req: Request) => {
  const nowYMD = dayjs(new Date()).startOf('day');
  const sort: Record<string, 1 | -1> = req.query.sort === '1' ? { ratingAverage: -1 } : { releaseDate: -1 };

  const query: PipelineStage[] = [
    // filter phim releaseDate <= current
    {
      $match: {
        isActive: true,
        // $or: [{ releaseDate: undefined }, { releaseDate: { $lte: nowYMD.toDate() } }] // test
        releaseDate: { $lte: nowYMD.toDate() } // official
      }
    },
    // Nối bảng genre để lấy data
    {
      $lookup: {
        from: 'genres',
        localField: 'genres',
        foreignField: '_id',
        as: 'genres',
        pipeline: [{ $project: { name: 1 } }]
      }
    },
    // Xử lý filter theo genre --> Giảm data
    {
      $match: {
        $expr: {
          $cond: [
            req.query.genre,
            {
              $or: [{ $in: [req.query.genre, '$genres.name.en'] }, { $in: [req.query.genre, '$genres.name.vi'] }]
            },
            {}
          ]
        }
      }
    },
    // Xử lý trường song ngữ
    { $set: { genres: `$genres.name.${req.getLocale()}` } },
    // Loại bỏ các trường dư thừa
    {
      $project: {
        _id: 1,
        title: 1,
        originalTitle: 1,
        poster: 1,
        duration: 1,
        releaseDate: 1,
        ageType: 1,
        genres: 1
      }
    },
    // Nối bảng lịch chiếu - startTime chỉ quan tâm tới YMD - Lấy data có startDate = now
    {
      $lookup: {
        from: 'showtimes',
        localField: '_id',
        foreignField: 'movie',
        pipeline: [
          { $project: { _id: 1, startTime: { $dateToString: { format: '%Y-%m-%d', date: '$startTime' } } } },
          { $match: { startTime: { $eq: nowYMD.format('YYYY-MM-DD') } } }
        ],
        as: 'showtimes'
      }
    },
    // Lấy những trường mà có lịch chiếu vào hôm nay <=> showwtimes có data
    {
      $addFields: {
        nowShowing: { $cond: [{ $ifNull: [{ $first: '$showtimes' }, false] }, true, false] }
      }
    },
    { $match: { nowShowing: true } }, // Lọc các film có lịch chiếu <=> Đang chiếu
    { $project: { showtimes: 0, nowShowing: 0 } }, // Xóa trường thừa
    // Xử lý sort
    { $sort: sort }
  ];

  addPaginationPipelineStage({ req, pipeline: query });

  return await MovieModel.aggregate(query);
};

export const getComingSoonMovies = async (req: Request) => {
  const startOfTomorrow = dayjs(new Date()).startOf('day').add(1, 'day').toDate();
  const nowYMD = dayjs(new Date()).startOf('day').format('YYYY-MM-DD');

  const query: PipelineStage[] = [
    // Filter
    {
      $match: {
        isActive: true,
        $or: [{ releaseDate: undefined }, { releaseDate: { $gte: startOfTomorrow } }]
      }
    },
    // Filter by genre
    {
      $lookup: {
        from: 'genres',
        localField: 'genres',
        foreignField: '_id',
        as: 'genres',
        pipeline: [{ $project: { name: 1 } }]
      }
    },
    {
      $match: {
        $expr: {
          $cond: [
            req.query.genre,
            {
              $or: [{ $in: [req.query.genre, '$genres.name.en'] }, { $in: [req.query.genre, '$genres.name.vi'] }]
            },
            {}
          ]
        }
      }
    },
    { $set: { genres: `$genres.name.${req.getLocale()}` } },
    // Lấy những field cần thiết
    {
      $project: {
        _id: 1,
        title: 1,
        originalTitle: 1,
        poster: 1,
        duration: 1,
        releaseDate: 1,
        ageType: 1,
        genres: 1
      }
    },
    // Lấy những phim có lịch chiếu >= now
    {
      $lookup: {
        from: 'showtimes',
        localField: '_id',
        foreignField: 'movie',
        pipeline: [
          { $project: { _id: 1, startTime: { $dateToString: { format: '%Y-%m-%d', date: '$startTime' } } } },
          { $match: { startTime: { $gte: nowYMD } } }
        ],
        as: 'showtimes'
      }
    },
    // Xác định những phim sắp chiếu nào đã mở bán vé
    {
      $addFields: {
        showing: {
          $cond: [{ $ifNull: [{ $first: '$showtimes' }, false] }, true, false]
        }
      }
    },
    { $project: { showtimes: 0 } },
    { $sort: { releaseDate: 1 } }
  ];

  addPaginationPipelineStage({ req, pipeline: query });

  return await MovieModel.aggregate(query);
};

export const getSneakShowMovies = async (req: Request) => {
  const startOfTomorrow = dayjs(new Date()).startOf('day').add(1, 'day').toDate();
  const nowYMD = dayjs(new Date()).startOf('day').format('YYYY-MM-DD');

  const query: PipelineStage[] = [
    // Danh sách phim chưa tới ngày ra mắt
    {
      $match: {
        isActive: true,
        $or: [{ releaseDate: undefined }, { releaseDate: { $gte: startOfTomorrow } }]
      }
    },
    { $set: { overview: `$overview.${req.getLocale()}` } },
    // Lấy những field cần thiết
    {
      $project: {
        _id: 1,
        title: 1,
        overview: 1,
        originalTitle: 1,
        poster: 1,
        duration: 1,
        releaseDate: 1,
        ageType: 1,
        genres: 1
      }
    },
    // Nối bảng để lấy thông tin genre
    {
      $lookup: {
        from: 'genres',
        localField: 'genres',
        foreignField: '_id',
        as: 'genres',
        pipeline: [{ $project: { name: 1 } }]
      }
    },
    { $set: { genres: `$genres.name.${req.getLocale()}` } },
    // Lấy những phim có lịch chiếu >= now
    {
      $lookup: {
        from: 'showtimes',
        localField: '_id',
        foreignField: 'movie',
        pipeline: [
          { $project: { _id: 1, startTime: { $dateToString: { format: '%Y-%m-%d', date: '$startTime' } } } },
          { $match: { startTime: { $gte: nowYMD } } }
        ],
        as: 'showtimes'
      }
    },
    {
      $addFields: {
        showing: {
          $cond: [{ $ifNull: [{ $first: '$showtimes' }, false] }, true, false]
        },
        nearestDay: { $first: '$showtimes.startTime' }
      }
    },
    { $match: { showing: true } },
    { $project: { showtimes: 0, showing: 0 } },
    { $sort: { releaseDate: -1, nearestDay: -1 } }
  ];

  addPaginationPipelineStage({ req, pipeline: query });

  return await MovieModel.aggregate(query);
};

export const getMostRateMovies = async (req: Request) => {
  const _limit = req.query.top ? Number(req.query.top) : 5;

  const _match = req.query.movieId
    ? { _id: { $ne: convertToMongooseId(req.query.movieId as string) }, isActive: true }
    : { isActive: true };

  const pipeline: PipelineStage[] = [
    { $match: _match },
    // Nối bảng để lấy thông tin genre
    {
      $lookup: {
        from: 'genres',
        localField: 'genres',
        foreignField: '_id',
        as: 'genres',
        pipeline: [{ $project: { name: 1 } }]
      }
    },
    { $set: { genres: `$genres.name.${req.getLocale()}` } },
    // Loại bỏ các trường dư thừa
    {
      $project: {
        _id: 1,
        title: 1,
        originalTitle: 1,
        poster: 1,
        duration: 1,
        releaseDate: 1,
        ageType: 1,
        genres: 1
      }
    },
    { $sort: { ratingAverage: -1, ratingCount: -1, totalFavorites: -1 } },
    { $limit: _limit }
  ];

  return await MovieModel.aggregate(pipeline);
};

export const getMovies = async (req: Request) => {
  const query: PipelineStage[] = [
    // Nối bảng để lấy thông tin genre
    {
      $lookup: {
        from: 'genres',
        localField: 'genres',
        foreignField: '_id',
        as: 'genres',
        pipeline: [{ $project: { name: 1 } }]
      }
    },
    { $set: { genres: `$genres.name.${req.getLocale()}` } },
    // Ẩn trường không cần
    { $project: { trailer: 0, directors: 0, actors: 0 } }
  ];

  const options = convertRequestToPipelineStages({
    req,
    fieldsApplySearch: ['title', 'originalTitle'],
    localizationFields: ['overview']
  });

  return await MovieModel.aggregate(query).append(...options);
};

export const deleteMovie = async (id: string) => {
  const doc = await MovieModel.findByIdAndDelete(id);
  if (!doc) {
    throw new NotFoundError(Message.MOVIE_NOT_FOUND);
  }
};
