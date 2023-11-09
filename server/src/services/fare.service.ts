import { FareModel, NotFoundError } from '../models';
import { type IUpdateFareRequest, type IFare } from '../interfaces';
import { Message } from '../constants';
import { convertToMongooseId } from '../utils';

export const createFare = async (fare: IFare) => {
  if (!fare.theater) {
    throw new NotFoundError(Message.MANAGER_THEATER_EMPTY);
  }

  if (fare.description && typeof fare.description === 'string') {
    try {
      fare.description = JSON.parse(fare.description);
    } catch (_) {}
  }

  const newFare = new FareModel(fare);
  return await newFare.save();
};

export const getFareByTheater = async (theaterId: string, lang?: string) => {
  const [fare] = await FareModel.aggregate([
    { $match: { theater: convertToMongooseId(theaterId) } },
    { $set: { description: lang ? `$description.${lang}` : `$description` } }
  ]); // Kết quả trả về chỉ có 1

  return fare;
};

export const deleteFare = async (id: string) => {
  return await FareModel.findByIdAndDelete(id);
};

export const updateFare = async (id: string, newFare: IUpdateFareRequest) => {
  if (newFare.description && typeof newFare.description === 'string') {
    try {
      newFare.description = JSON.parse(newFare.description);
    } catch (_) {}
  }

  const fare = await FareModel.findByIdAndUpdate(id, newFare, { new: true });
  if (!fare) throw new NotFoundError(Message.FARE_NOT_FOUND);

  return fare;
};
