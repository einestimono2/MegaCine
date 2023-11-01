import Redis from 'ioredis';

import { Message } from './../constants';
import logger from '../utils';
import { BadRequestError } from '../models';

require('dotenv').config();

const client = () => {
  if (process.env.REDIS_URL) {
    logger.info(`Redis connected`);

    return process.env.REDIS_URL;
  }

  throw new BadRequestError(Message.REDIS_CONNECTION_FAIL);
};

export const redis = new Redis(client());
