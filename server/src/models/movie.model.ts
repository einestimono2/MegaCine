import mongoose, { type Schema } from 'mongoose';

import { type IMovie } from '../interfaces';
import { Message, AgeTypes } from '../constants';

const movieSchema: Schema<IMovie> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, `'${Message.FIELD_s_EMPTY}', 'title'`]
    },
    originalTitle: {
      type: String,
      required: [true, `'${Message.FIELD_s_EMPTY}', 'originalTitle'`]
    },
    trailer: {
      type: String,
      required: [true, `'${Message.FIELD_s_EMPTY}', 'trailer'`]
    },
    poster: {
      public_id: {
        type: String,
        required: [true, `'${Message.FIELD_s_EMPTY}', 'poster.public_id'`]
      },
      url: {
        type: String,
        required: [true, `'${Message.FIELD_s_EMPTY}', 'poster.url'`]
      }
    },
    overview: {
      en: {
        type: String,
        required: [true, `'${Message.FIELD_s_EMPTY}', 'overview.en'`]
      },
      vi: {
        type: String,
        required: [true, `'${Message.FIELD_s_EMPTY}', 'overview.vi'`]
      }
    },
    duration: Number,
    releaseDate: Date,
    directors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
        required: [true, `'${Message.FIELD_s_EMPTY}', 'directors'`]
      }
    ],
    actors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
        required: [true, `'${Message.FIELD_s_EMPTY}', 'actors'`]
      }
    ],
    language: {
      en: {
        type: String,
        required: [true, `'${Message.FIELD_s_EMPTY}', 'language.vi'`]
      },
      vi: {
        type: String,
        required: [true, `'${Message.FIELD_s_EMPTY}', 'language.vi'`]
      }
    },
    ageType: {
      type: String,
      enum: {
        values: Object.values(AgeTypes),
        message: `'${Message.INVALID_AGETYPE_s}', '{VALUE}'`
      },
      required: [true, `'${Message.FIELD_s_EMPTY}', 'ageType'`]
    },
    genres: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        required: [true, `'${Message.FIELD_s_EMPTY}', 'genres'`]
      }
    ],
    totalRate: Number,
    totalFavorites: Number,
    isActive: {
      type: Boolean,
      default: true
    },
    ratings: {
      average: Number,
      count: Number
    },
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
