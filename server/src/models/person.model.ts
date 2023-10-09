import mongoose, { type Schema } from 'mongoose';

import { type IPerson } from '../interfaces';
import { DEFAULT_AVATAR_URL, Message } from '../constants';

const personSchema: Schema<IPerson> = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, `'${Message.NAME_EMPTY}'`]
    },
    summary: String,
    avatar: {
      public_id: String,
      url: {
        type: String,
        default: DEFAULT_AVATAR_URL
      }
    }
  },
  { timestamps: true, versionKey: false }
);

export const PersonModel = mongoose.model<IPerson>('Person', personSchema);