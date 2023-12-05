import mongoose, { type Schema } from 'mongoose';
import dayjs from 'dayjs';

import { type IShowtime } from '../interfaces';
import { Message, MovieLanguages, ShowtimeTypes } from '../constants';
import { ConflictError, MovieModel, NotFoundError, RoomModel } from '.';

const showtimeSchema: Schema<IShowtime> = new mongoose.Schema(
  {
    movie: {
      required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'movie'`],
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie'
    },
    theater: {
      required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'theater'`],
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Theater'
    },
    room: {
      required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'room'`],
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room'
    },
    startTime: {
      type: Date,
      required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'startTime'`]
    },
    endTime: Date,
    isActive: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      enum: {
        values: Object.values(ShowtimeTypes),
        message: `'${Message.INVALID_SHOWTIME_TYPE_s.msg}', '{VALUE}'`
      },
      default: ShowtimeTypes.Sneakshow
    },
    language: {
      type: String,
      enum: {
        values: Object.values(MovieLanguages),
        message: `'${Message.INVALID_MOVIE_LANGUAGE_s.msg}', '{VALUE}'`
      },
      default: MovieLanguages.Subtitles
    }
  },
  { timestamps: true, versionKey: false }
);

// Không có lịch chiếu nào cùng phòng + cùng giờ bắt đầu
// showtimeSchema.index({ startTime: 1, room: 1 }, { unique: true });

// Advanced validate
showtimeSchema.pre('validate', async function (next, done) {
  const movie = await MovieModel.findById(this.movie);
  if (!movie) {
    next(new NotFoundError(Message.MOVIE_NOT_FOUND));
    return;
  }

  // Loại phim với loại phòng chiếu phải khớp nhau
  const room = await RoomModel.findById(this.room);
  if (!room) {
    next(new NotFoundError(Message.ROOM_NOT_FOUND));
    return;
  }
  if (!movie.formats.includes(room.type)) {
    next(new ConflictError(Message.INVALID_SHOWTIME_ROOM_TYPE));
  }

  // Languages (Phụ đề | Lồng tiếng) phải khớp với phim
  if (!movie.languages.includes(this.language)) {
    next(new ConflictError(Message.INVALID_SHOWTIME_LANGUAGES));
  }

  // Phim phải phát hành trước khi có lịch chiếu trừ trường hợp chiếu sớm
  if (
    movie.releaseDate &&
    this.type !== ShowtimeTypes.Sneakshow &&
    dayjs(this.startTime).isBefore(movie.releaseDate)
  ) {
    next(new ConflictError(Message.INVALID_SHOWTIME_STARTTIME));
  }

  // endTime = startTime + movieDuration
  if (this.endTime && !dayjs(this.endTime).isSame(dayjs(this.startTime).add(movie.duration, 'm'))) {
    next(new ConflictError(Message.INVALID_SHOWTIME_ENDTIME));
  } else if (!this.endTime) {
    this.endTime = dayjs(this.startTime).add(movie.duration, 'm').toDate();
  }

  // Kiểm tra startTime có nằm trong lịch chiếu nào thuộc cùng phòng chiếu đó không?
  const isExist = await this.model().findOne({
    theater: this.theater,
    room: this.room,
    isActive: true,
    startTime: { $lte: this.startTime },
    endTime: { $gte: this.startTime }
  });
  if (isExist) {
    next(new ConflictError(Message.SHOWTIME_ALREADY_EXIST));
  }

  next();
});

// Nếu có cập nhật startTime thì validate startTime mới
showtimeSchema.pre('findOneAndUpdate', async function (next, done) {
  const queryObj = this as any;

  if (!queryObj._update.startTime && queryObj._update.endTime) {
    next(new ConflictError(Message.INVALID_SHOWTIME_ENDTIME));
  }

  if (queryObj._update.startTime) {
    const oldDoc = await this.model.findOne(this.getQuery());

    // Validate endTime
    const movie = await MovieModel.findById(oldDoc.movie);
    if (!movie) {
      next(new NotFoundError(Message.MOVIE_NOT_FOUND));
      return;
    }

    if (
      queryObj._update.endTime &&
      !dayjs(queryObj._update.endTime).isSame(dayjs(queryObj._update.startTime).add(movie.duration, 'm'))
    ) {
      next(new ConflictError(Message.INVALID_SHOWTIME_ENDTIME));
    } else if (!queryObj._update.endTime) {
      const endTime = dayjs(queryObj._update.startTime).add(movie.duration, 'm').toDate();
      this.setUpdate({ ...this.getUpdate(), endTime });
    }

    // Validate startTime
    const isExist = await this.model.findOne({
      _id: { $ne: oldDoc._id }, // Loại trừ trường hợp hiện tại
      theater: oldDoc.theater,
      room: oldDoc.room,
      isActive: true,
      startTime: { $lte: queryObj._update.startTime },
      endTime: { $gte: queryObj._update.startTime }
    });

    if (isExist) {
      next(new ConflictError(Message.SHOWTIME_ALREADY_EXIST));
    }
  }

  next();
});

export const ShowtimeModel = mongoose.model<IShowtime>('Showtime', showtimeSchema);
