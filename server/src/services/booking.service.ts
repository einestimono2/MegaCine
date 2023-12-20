import { type Request } from 'express';
import { type PipelineStage } from 'mongoose';

import { BookingModel, NotFoundError } from '../models';
import { type IBooking } from '../interfaces';
import { Message } from '../constants';
import { addPaginationPipelineStage, convertToMongooseId } from '../utils';

export const createBooking = async (booking: IBooking) => {
  const _booking = await BookingModel.create(booking);

  return _booking;
};

export const deleteBooking = async (id: string) => {
  const doc = await BookingModel.findByIdAndDelete(id);
  if (!doc) {
    throw new NotFoundError(Message.BOOKING_NOT_FOUND);
  }
};

export const getBookingDetails = async (id: string) => {
  const booking = await BookingModel.findById(id)
    .populate('user', { name: 1, email: 1, phoneNumber: 1 })
    .populate('showtime')
    .populate('theater')
    .populate('room')
    .populate('products.item')
    .populate('payment.promotion');
  if (!booking) {
    throw new NotFoundError(Message.BOOKING_NOT_FOUND);
  }

  return booking;
};

export const getBookingsByUser = async (req: Request) => {
  const pipeline: PipelineStage[] = [
    { $match: { user: convertToMongooseId(req.userPayload?.id) } },
    { $sort: { createdAt: -1 } }
  ];

  addPaginationPipelineStage({ req, pipeline });

  return await BookingModel.aggregate(pipeline);
};

export const getBookingsByTheater = async (req: Request) => {
  const pipeline: PipelineStage[] = [
    { $match: { theater: convertToMongooseId(req.userPayload?.theater) } },
    { $sort: { createdAt: -1 } }
  ];

  addPaginationPipelineStage({ req, pipeline });

  return await BookingModel.aggregate(pipeline);
};

export const getBookings = async (req: Request) => {
  const pipeline: PipelineStage[] = [{ $sort: { createdAt: 1 } }];

  addPaginationPipelineStage({ req, pipeline });

  return await BookingModel.aggregate(pipeline);
};
