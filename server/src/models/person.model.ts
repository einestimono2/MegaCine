import mongoose, { type Schema } from 'mongoose';

import { type IPerson } from '../interfaces';
import { DEFAULT_AVATAR_URL, Message, PERSON_UPLOAD_FOLDER } from '../constants';
import { cloudinaryServices } from '../services';

const personSchema: Schema<IPerson> = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, `'${Message.NAME_EMPTY.msg}'`]
    },
    summary: {
      en: String,
      vi: String
    },
    avatar: {
      type: String,
      default: DEFAULT_AVATAR_URL
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

// Middleware khi gọi findByIdAndDelete
personSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await cloudinaryServices.destroy({
      public_id: doc._id,
      folder: PERSON_UPLOAD_FOLDER
    });
  }
});

export const PersonModel = mongoose.model<IPerson>('Person', personSchema);
