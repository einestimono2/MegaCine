import mongoose, { type Schema } from 'mongoose';

import { type IBooking, type IPayment } from '../interfaces';
import { Message, PaymentMethods } from '../constants';
import { generateQRCode } from '../utils';

const paymentSchema: Schema<IPayment> = new mongoose.Schema({
  promotion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Promotion'
  },
  discountAmount: {
    type: Number,
    default: 0
  },
  totalPrice: {
    type: Number,
    required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'payment.totalPrice'`]
  },
  method: {
    type: String,
    enum: {
      values: Object.values(PaymentMethods),
      message: `'${Message.INVALID_PAYMENT_METHOD_s.msg}'`
    },
    default: PaymentMethods.Card
  },
  paidAt: {
    type: Date,
    default: Date.now()
  }
});

const bookingSchema: Schema<IBooking> = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    email: String,
    phoneNumber: String,
    showtime: {
      required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'showtime'`],
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Showtime'
    },
    theater: {
      required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'theater'`],
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Theater'
    },
    room: {
      required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'room'`],
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room'
    },
    seats: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Seat'
        }
      ],
      required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'seats'`],
      default: undefined // Nếu k mặc định là [] ==> required: true không hoạt động
    },
    products: [
      {
        quantity: Number,
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product'
        }
      }
    ],
    qrcode: {
      type: String,
      required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'qrcode'`]
    },
    payment: {
      type: paymentSchema,
      required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'payment'`]
    }
  },
  { timestamps: true, versionKey: false }
);

bookingSchema.pre('save', async function (next) {
  this.qrcode = await generateQRCode(this._id);
  next();
});

export const BookingModel = mongoose.model<IBooking>('Booking', bookingSchema);
