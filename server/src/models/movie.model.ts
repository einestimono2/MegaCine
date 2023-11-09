import mongoose, { type Schema } from 'mongoose';

import { type IMovie } from '../interfaces';
import { Message, AgeTypes, MovieTypes } from '../constants';

const movieSchema: Schema<IMovie> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'title'`]
    },
    originalTitle: {
      type: String,
      required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'originalTitle'`]
    },
    trailer: {
      type: String,
      required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'trailer'`]
    },
    poster: {
      public_id: {
        type: String,
        required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'poster.public_id'`]
      },
      url: {
        type: String,
        required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'poster.url'`]
      }
    },
    overview: {
      en: {
        type: String,
        required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'overview.en'`]
      },
      vi: {
        type: String,
        required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'overview.vi'`]
      }
    },
    type: {
      type: String,
      enum: {
        values: Object.values(MovieTypes),
        message: `'${Message.INVALID_MOVIE_TYPE_s.msg}', '{VALUE}'`
      },
      required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'type'`]
    },
    duration: Number,
    releaseDate: Date,
    directors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
        required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'directors'`]
      }
    ],
    actors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
        required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'actors'`]
      }
    ],
    language: {
      en: {
        type: String,
        required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'language.en'`]
      },
      vi: {
        type: String,
        required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'language.vi'`]
      }
    },
    ageType: {
      type: String,
      enum: {
        values: Object.values(AgeTypes),
        message: `'${Message.INVALID_AGETYPE_s.msg}', '{VALUE}'`
      },
      required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'ageType'`]
    },
    genres: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'genres'`]
      }
    ],
    totalRate: Number,
    totalFavorites: Number,
    isActive: {
      type: Boolean,
      default: true
    },
    ratingAverage: Number,
    ratingCount: Number,
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
      }
    ],
    theater: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theater'
      }
    ]
  },
  { timestamps: true, versionKey: false }
);

export const MovieModel = mongoose.model<IMovie>('Movie', movieSchema);
