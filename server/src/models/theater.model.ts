import mongoose, { Schema } from 'mongoose';

import { type ITheater } from '../interfaces';
import { Message, LocationTypes, EMAIL_REGEX_PATTERN } from '../constants';

const theaterSchema: Schema<ITheater> = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: [true, `'${Message.FIELD_s_EMPTY.msg}','name'`]
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, `'${Message.FIELD_s_EMPTY.msg}','email'`],
      validate: {
        validator: function (value: string) {
          return EMAIL_REGEX_PATTERN.test(value);
        },
        message: `'${Message.INVALID_EMAIL.msg}'`
      }
    },
    description: {
      en: String,
      vi: String
    },
    hotline: {
      type: String,
      trim: true,
      unique: true,
      required: [true, `'${Message.FIELD_s_EMPTY.msg}','hotline'`]
    },
    logo: {
      public_id: String,
      url: String
    },
    images: [
      new Schema(
        {
          public_id: String,
          url: String
        },
        { _id: false }
      )
    ],
    address: {
      type: String,
      trim: true,
      required: [true, `'${Message.FIELD_s_EMPTY.msg}','location.address'`]
    },
    location: {
      type: {
        type: String,
        enum: {
          values: Object.values(LocationTypes),
          message: `'${Message.INVALID_COORDINATE_TYPE_s.msg}', '{VALUE}'`
        },
        default: LocationTypes.Point
      },
      coordinates: {
        type: [Number, Number], // [long, lat]
        required: [true, `'${Message.FIELD_s_EMPTY.msg}','location.coordinates'`],
        validate: {
          validator: function (coords: number[]) {
            // Kiểm tra tính hợp lệ của tọa độ
            return (
              Array.isArray(coords) &&
              coords.length === 2 &&
              coords[0] >= -180 &&
              coords[0] <= 180 &&
              coords[1] >= -90 &&
              coords[1] <= 90
            );
          },
          message: `'${Message.INVALID_COORDINATES.msg}'`
        }
      }
    },
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
      }
    ],
    isActive: {
      type: Boolean,
      default: true
    },
    totalFavorites: Number,
    ratingAverage: Number,
    ratingCount: Number,
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
      }
    ],
    fare: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Fare'
    },
    movies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
      }
    ]
  },
  { timestamps: true, versionKey: false }
);

theaterSchema.index({ location: '2dsphere' });

export const TheaterModel = mongoose.model<ITheater>('Theater', theaterSchema);
