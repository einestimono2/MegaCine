import Redis from 'ioredis';

import { Message } from './../constants';
import logger from '../utils';
import { BadRequestError } from '../models';

require('dotenv').config();

const client = () => {
  if (process.env.REDIS_URL) {
    return process.env.REDIS_URL;
  }

  throw new BadRequestError(Message.REDIS_CONNECTION_FAIL);
};

const redis = new Redis(client());

redis.on('connect', () => {
  logger.info(`Redis connected with ${process.env.REDIS_URL}`);
});

redis.on('error', (error) => {
  logger.error('Redis connection failed: ', error);
});

export { redis };
