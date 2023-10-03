import Redis from 'ioredis';

import { Message } from './../constants';
import logger from '../utils';

require('dotenv').config({
  path: 'src/config/.env'
});

const redisClient = () => {
  if (process.env.REDIS_URL) {
    logger.info(`Redis connected`);

    return process.env.REDIS_URL;
  }

  throw new Error(Message.REDIS_CONNECTION_FAIL);
};

export const redis = new Redis(redisClient());
