import mongoose, { type Schema } from 'mongoose';

import { type IProduct } from '../interfaces';
import { Message, PRODUCT_UPLOAD_FOLDER } from '../constants';
import { cloudinaryServices } from '../services';

const productSchema: Schema<IProduct> = new mongoose.Schema(
  {
    name: {
      type: String,
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
      type: String,
      required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'image'`]
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

productSchema.index({ name: 1, theater: 1 }, { unique: true });

// Middleware khi gọi findByIdAndDelete
productSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await cloudinaryServices.destroy({
      public_id: doc._id,
      folder: PRODUCT_UPLOAD_FOLDER
    });
  }
});

export const ProductModel = mongoose.model<IProduct>('Product', productSchema);
