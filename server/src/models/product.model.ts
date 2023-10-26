import mongoose, { type Schema } from 'mongoose';

import { type IProduct } from '../interfaces';
import { Message } from '../constants';

const productSchema: Schema<IProduct> = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, `'${Message.FIELD_s_EMPTY}', 'name'`]
    },
    description: {
      en: {
        type: String,
        required: [true, `'${Message.FIELD_s_EMPTY}', 'description.en'`]
      },
      vi: {
        type: String,
        required: [true, `'${Message.FIELD_s_EMPTY}', 'description.vi'`]
      }
    },
    image: {
      public_id: String,
      url: {
        type: String,
        required: [true, `'${Message.FIELD_s_EMPTY}', 'image.url'`]
      }
    },
    price: {
      type: Number,
      required: [true, `'${Message.FIELD_s_EMPTY}', 'price'`]
    },
    isActive: {
      type: Boolean,
      default: true
    },
    theater: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Theater',
      required: [true, `'${Message.FIELD_s_EMPTY}', 'theater'`]
    }
  },
  { timestamps: true, versionKey: false }
);

export const ProductModel = mongoose.model<IProduct>('Product', productSchema);
