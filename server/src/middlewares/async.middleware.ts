import { type NextFunction, type Request, type Response } from 'express';

export const CatchAsyncError = (theFunc: any) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(theFunc(req, res, next)).catch(next);
};
