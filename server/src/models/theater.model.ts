import mongoose, { type Schema } from 'mongoose';

import { type ITheater } from '../interfaces';
import { Message, LocationType, RoomType } from '../constants';

const theaterSchema: Schema<ITheater> = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, `'${Message.NAME_EMPTY}'`]
    },
    email: String,
    description: String,
    hotline: {
      type: String,
      trim: true,
      required: [true, `'${Message.NAME_EMPTY}'`]
    },
    thumbnail: {
      public_id: String,
      url: String
    },
    cover: {
      public_id: String,
      url: String
    },
    location: {
      type: {
        type: String,
        enum: [LocationType.Point],
        default: LocationType.Point
      },
      address: {
        type: String,
        trim: true,
        required: [true, `'${Message.NAME_EMPTY}'`]
      },
      coordinates: {
        type: [Number],
        required: [true, `'${Message.NAME_EMPTY}'`],
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
          message: 'Coordinates are not valid.'
        }
      }
    },
    rooms: [
      {
        name: String,
        type: {
          type: String,
          enum: [RoomType['2D'], RoomType['3D']]
        }
      }
    ],
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true, versionKey: false }
);

theaterSchema.index({ location: '2dsphere' });

export const CinemaModel = mongoose.model<ITheater>('Theater', theaterSchema);
