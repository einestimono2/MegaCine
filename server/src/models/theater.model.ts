import mongoose, { type Schema } from 'mongoose';

import { type ITheater } from '../interfaces';
import { Message, LocationTypes, EMAIL_REGEX_PATTERN, MOVIE_UPLOAD_FOLDER } from '../constants';
import { cloudinaryServices } from '../services';
import { FareModel } from './fare.model';

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
    logo: String,
    images: [String],
    address: {
      type: String,
      trim: true,
      required: [true, `'${Message.FIELD_s_EMPTY.msg}','address'`]
    },
    addressCode: {
      city: {
        type: Number,
        required: [true, `'${Message.FIELD_s_EMPTY.msg}','addressCode.city'`]
      },
      district: {
        type: Number,
        required: [true, `'${Message.FIELD_s_EMPTY.msg}','addressCode.district'`]
      },
      ward: {
        type: Number,
        required: [true, `'${Message.FIELD_s_EMPTY.msg}','addressCode.ward'`]
      },
      detail: String
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
    isActive: {
      type: Boolean,
      default: true
    },
    totalFavorites: Number,
    ratingAverage: Number,
    ratingCount: Number
  },
  { timestamps: true, versionKey: false }
);

theaterSchema.index({ location: '2dsphere' });

// Middleware khi gọi findByIdAndDelete
theaterSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    // Xóa logo
    if (doc.logo) {
      await cloudinaryServices.destroy({
        public_id: `${doc._id}_logo`,
        folder: MOVIE_UPLOAD_FOLDER
      });
    }

    // Xóa images
    if (doc.images.length) {
      for (let idx = 0; idx < doc.images.length; idx++) {
        await cloudinaryServices.destroy({
          public_id: `${doc._id}_images_${idx}`,
          folder: MOVIE_UPLOAD_FOLDER
        });
      }
    }

    // Xóa bảng fare
    await FareModel.findOneAndDelete({ theater: doc._id });
  }
});

export const TheaterModel = mongoose.model<ITheater>('Theater', theaterSchema);
