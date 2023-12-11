import mongoose, { type Schema } from 'mongoose';

import { type IPromotion } from '../interfaces';
import { DEFAULT_IMAGE_URL, Message, DiscountTypes, PROMOTION_UPLOAD_FOLDER } from '../constants';
import { isCloudinaryImageUrl } from '../utils';
import { cloudinaryServices } from '../services';

const promotionSchema: Schema<IPromotion> = new mongoose.Schema(
  {
    code: String,
    title: {
      type: String,
      required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'title'`]
    },
    content: {
      type: String,
      required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'content'`]
    },
    startTime: {
      type: Date,
      required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'startTime'`]
    },
    endTime: Date,
    thumbnail: {
      type: String,
      default: DEFAULT_IMAGE_URL
    },
    value: {
      type: Number,
      required: [
        function () {
          return Boolean(this.code);
        },
        `'${Message.FIELD_s_EMPTY.msg}', 'value'`
      ]
    },
    type: {
      type: String,
      enum: {
        values: Object.values(DiscountTypes),
        message: `'${Message.INVALID_PROMOTION_TYPE_s.msg}', '{VALUE}'`
      },
      required: [
        function () {
          return Boolean(this.code);
        },
        `'${Message.FIELD_s_EMPTY.msg}', 'value'`
      ]
    },
    userUsed: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    isActive: {
      type: Boolean,
      default: true
    },
    theater: {
      required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'theater'`],
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Theater'
    }
  },
  { timestamps: true, versionKey: false }
);

// Up ảnh và thay thế nếu không phải link cloudinary
promotionSchema.pre('save', async function (next) {
  if (this.thumbnail && !isCloudinaryImageUrl(this.thumbnail)) {
    this.thumbnail = await cloudinaryServices.uploadImage({
      public_id: this._id,
      file: this.thumbnail,
      folder: PROMOTION_UPLOAD_FOLDER
    });
  }

  next();
});

// Middleware khi gọi findByIdAndDelete
promotionSchema.post('findOneAndDelete', async function (doc) {
  if (doc && doc.thumbnail !== DEFAULT_IMAGE_URL) {
    await cloudinaryServices.destroy({
      public_id: doc._id,
      folder: PROMOTION_UPLOAD_FOLDER
    });
  }
});

// promotionSchema.pre('findOneAndUpdate', async function (next) {
//   const queryObj = this as any;

//   if (queryObj._update.thumbnail) {
//     const oldDoc = await this.model.findOne(this.getQuery());

//     // Nếu trước đó chưa có ảnh --> Upload ảnh để lấy link
//     if (oldDoc && oldDoc.thumbnail === DEFAULT_IMAGE_URL) {
//       this.setUpdate({
//         ...this.getUpdate(),
//         thumbnail: await cloudinaryServices.uploadImage({
//           public_id: oldDoc._id,
//           file: queryObj._update.thumbnail,
//           folder: PROMOTION_UPLOAD_FOLDER
//         })
//       });
//     }
//   }
// });

export const PromotionModel = mongoose.model<IPromotion>('Promotion', promotionSchema);
