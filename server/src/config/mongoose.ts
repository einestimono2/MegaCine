import mongoose from 'mongoose';

import logger from '../utils';

export const connectDB = () => {
  if (process.env.NODE_ENV === 'development') {
    mongoose.set('debug', true);
  }

  mongoose
    .connect(process.env.MONGODB_CLOUD_URI ?? '')
    .then((data: any) => {
      logger.info(`MongoDB connected with ${data.connection.host}`);
    })
    .catch((error: any) => {
      logger.error(error.message);
      setTimeout(connectDB, 5000);
    });

  mongoose.connection.on('error', (err: Error) => {
    logger.error(`[database]-[mongo] error ${err.message}`);
    process.exit(1);
  });
};
