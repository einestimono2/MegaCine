import mongoose, { type Schema } from 'mongoose';

import { type IGenre } from '../interfaces';
import { Message } from '../constants';

const genreSchema: Schema<IGenre> = new mongoose.Schema(
  {
    name: {
      en: {
        type: String,
        unique: true,
        trim: true,
        required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'name.en'`]
      },
      vi: {
        type: String,
        unique: true,
        trim: true,
        required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'name.vi'`]
      }
    }
  },
  { timestamps: true, versionKey: false }
);

export const GenreModel = mongoose.model<IGenre>('Genre', genreSchema);
