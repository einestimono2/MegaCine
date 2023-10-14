import mongoose, { type Schema } from 'mongoose';

import { type IMovie } from '../interfaces';
import { Message } from '../constants';

const movieSchema: Schema<IMovie> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, `'${Message.NAME_EMPTY}'`]
    }
  },
  { timestamps: true, versionKey: false }
);

export const MovieModel = mongoose.model<IMovie>('Movie', movieSchema);
