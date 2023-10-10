import mongoose, { type Schema } from 'mongoose';

import { type IGenre } from '../interfaces';
import { Message } from '../constants';

const genreSchema: Schema<IGenre> = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, `'${Message.NAME_EMPTY}'`]
    }
  },
  { timestamps: true, versionKey: false }
);

export const GenreModel = mongoose.model<IGenre>('Genres', genreSchema);
