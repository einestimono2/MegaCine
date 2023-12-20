import { RoomModel, NotFoundError } from '../models';
import { type IUpdateRoomRequest, type IRoom } from '../interfaces';
import { Message } from '../constants';

export const createRoom = async (room: IRoom) => {
  if (!room.theater) {
    throw new NotFoundError(Message.MANAGER_THEATER_EMPTY);
  }

  const newRoom = new RoomModel(room);
  return await newRoom.save();
};

export const deleteRoom = async (id: string) => {
  return await RoomModel.findByIdAndDelete(id);
};

export const updateRoom = async (id: string, newRoom: IUpdateRoomRequest) => {
  const room = await RoomModel.findByIdAndUpdate(id, newRoom, { new: true });
  if (!room) throw new NotFoundError(Message.ROOM_NOT_FOUND);

  return room;
};

export const getRoomsByTheater = async (theater: string) => {
  const rooms = await RoomModel.find({ theater }, { seats: false });

  return rooms;
};

export const getRoomDetails = async (id: string) => {
  const rooms = await RoomModel.findById(id);

  return rooms;
};

export const updateSeat = async (id: string) => {
  //
};
