import { type NextFunction, type Request, type Response } from 'express';

import { CatchAsyncError } from '../middlewares';
import { roomServices } from '../services';

// Create a new room
export const createRoom = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const room = await roomServices.createRoom({ ...req.body, theater: req.userPayload?.theater });

  res.sendCREATED({
    data: room
  });
});

// Get list rooms of theater
export const getRoomsByTheater = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const room = await roomServices.getRoomsByTheater(req.params.id);

  res.sendOK({
    data: room
  });
});

export const getRooms = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  //
});

export const getRoomDetails = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const room = await roomServices.getRoomDetails(req.params.id);

  res.sendOK({
    data: room ?? {}
  });
});

// Update Room
export const updateRoom = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const room = await roomServices.updateRoom(req.params.id, req.body);

  res.sendCREATED({
    data: room
  });
});

// Delete Room
export const deleteRoom = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  await roomServices.deleteRoom(req.params.id);

  res.sendOK();
});
