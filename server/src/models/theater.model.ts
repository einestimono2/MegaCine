import mongoose, { type Schema } from 'mongoose';

import { type ITheater } from '../interfaces';
import { Message, LocationType } from '../constants';

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
      required: [true, `'${Message.FIELD_s_EMPTY.msg}','email'`]
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
      {
        public_id: String,
        url: String
      }
    ],
    address: {
      type: String,
      trim: true,
      required: [true, `'${Message.FIELD_s_EMPTY.msg}','location.address'`]
    },
    location: {
      type: {
        type: String,
        enum: [LocationType.Point],
        default: LocationType.Point
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
    roomSummary: {
      type: String,
      required: [true, `'${Message.FIELD_s_EMPTY.msg}','roomSummary'`]
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
    ratings: {
      average: Number,
      count: Number
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
      }
    ]
  },
  { timestamps: true, versionKey: false }
);

theaterSchema.index({ location: '2dsphere' });

export const TheaterModel = mongoose.model<ITheater>('Theater', theaterSchema);
