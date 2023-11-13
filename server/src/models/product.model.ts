import mongoose, { type Schema } from 'mongoose';

import { type IProduct } from '../interfaces';
import { Message } from '../constants';

const productSchema: Schema<IProduct> = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'name'`]
    },
    description: {
      en: {
        type: String,
        required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'description.en'`]
      },
      vi: {
        type: String,
        required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'description.vi'`]
      }
    },
    image: {
      public_id: String,
      url: {
        type: String,
        required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'image.url'`]
      }
    },
    price: {
      type: Number,
      required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'price'`]
    },
    isActive: {
      type: Boolean,
      default: true
    },
    theater: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Theater',
      required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'theater'`]
    }
  },
  { timestamps: true, versionKey: false }
);

export const ProductModel = mongoose.model<IProduct>('Product', productSchema);
