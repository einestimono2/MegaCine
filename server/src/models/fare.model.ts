import mongoose, { type Schema } from 'mongoose';

import { type IFare } from '../interfaces';
import { Message } from '../constants';

const fareSchema: Schema<IFare> = new mongoose.Schema(
  {
    description: {
      en: String,
      vi: String
    },
    normalDay: {
      type: String,
      required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'normalDay'`]
    },
    weekend: {
      type: String,
      required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'weekend'`]
    },
    specialDay: {
      type: String,
      required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'specialDay'`]
    },
    u22: {
      type: Number,
      required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'u22'`]
    },
    _2d: [
      {
        type: mongoose.Schema.Types.Mixed,
        required: [true, `'${Message.FIELD_s_EMPTY.msg}', '_3d'`]
      }
    ],
    _3d: [
      {
        type: mongoose.Schema.Types.Mixed,
        required: [true, `'${Message.FIELD_s_EMPTY.msg}', '_3d'`]
      }
    ],
    surcharge: [
      {
        name: String,
        value: Number,
        _id: false // Tắt trường _id
      }
    ],
    theater: {
      unique: true,
      required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'theater'`],
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Theater'
    }
  },
  { timestamps: true, versionKey: false }
);

export const FareModel = mongoose.model<IFare>('Fare', fareSchema);

// {
//   _id: false,
//   type: String, // 2D, 3D
//   schedules: [
//     {
//       _id: false,
//       start: String,
//       end: String,
//       specialAgePrice: Number,
//       seatType: [
//         {
//           _id: false,
//           type: String,
//           normalDayPrice: Number,
//           specialDayPrice: Number
//         }
//       ]
//     }
//   ]
// }
