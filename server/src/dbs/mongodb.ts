import mongoose from 'mongoose';

import logger from '../utils';
import { mongodb } from '../config';

const { uri } = mongodb;

// Instance
class Database {
  static instance: Database;

  // constructor() {
  //   this.connect();
  // }

  connect(_type = 'mongodb') {
    if (process.env.NODE_ENV === 'dev') {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }

    mongoose
      .connect(uri, { maxPoolSize: 50 })
      .then((data: any) => {
        logger.info(`MongoDB connected with ${data.connection.host}`);
      })
      .catch((error: any) => {
        logger.error(error.message);
        setTimeout(this.connect, 5000);
      });

    mongoose.connection.on('error', (err: Error) => {
      logger.error(`[database]-[mongo] error ${err.message}`);
      process.exit(1);
    });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

export const instanceDb = Database.getInstance();
