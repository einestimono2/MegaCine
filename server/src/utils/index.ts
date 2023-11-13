import mongoose from 'mongoose';

export { logger as default } from './logger';

export const convertToMongooseId = (id?: string) => new mongoose.Types.ObjectId(id);

export * from './send-mail';
export * from './send-token';
export * from './omit';
export * from './api-request';
export * from './db-check-connect';
export * from './unlink-file';
