import mongoose, { type Schema } from 'mongoose';

import { type IReview } from '../interfaces';
import { Message } from '../constants';

const reviewSchema: Schema<IReview> = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'rating'`]
    },
    message: {
      type: String,
      required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'messages'`]
    },
    isActive: {
      type: Boolean,
      default: true
    },
    user: {
      required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'user'`],
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    theater: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Theater'
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie'
    }
  },
  { timestamps: true, versionKey: false }
);

export const ReviewModel = mongoose.model<IReview>('Review', reviewSchema);
