import { createServer } from 'http';

import app from './app';
import logger from './utils';
import { app as appConfig } from './config';
import { SocketServer } from './socket';

const PORT = appConfig.port;
const httpServer = createServer(app);

//! Socket Server
SocketServer.getInstance(httpServer);

//! Http Server
const server = httpServer.listen(PORT, () => {
  logger.info(`Server is running at http://localhost:${PORT}  [env: ${app.get('env')}]`);
});

process.on('SIGINT', () => {
  server.close(() => {
    logger.info('Exit express server!');
    process.exit();
  });
});
