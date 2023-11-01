import mongoose from 'mongoose';
import os from 'os';
import process from 'process';

import { logger } from './logger';
import { MONITOR_TIMER } from '../constants';

export const checkConnection = () => {
  const numConnections = mongoose.connections.length;

  logger.info(`Number of connections: ${numConnections}`);
};

export const checkOverload = () => {
  setInterval(() => {
    const numConnections = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;

    logger.info(`Active connections: ${numConnections} (${(memoryUsage / 1024 / 1024).toFixed(2)} MB Memory)`);

    // Giả sử mỗi core - 5 connect
    const maxConnections = numCores * 5;
    if (numConnections > maxConnections) {
      logger.error(`Connection overload detected!`);
    }
  }, MONITOR_TIMER); // Theo dõi mỗi 5s
};
