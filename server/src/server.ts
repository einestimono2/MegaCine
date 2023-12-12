import app from './app';
import logger, { imageCleaningSchedule } from './utils';
import { app as appConfig } from './config/env';

const PORT = appConfig.port;

// Server
const server = app.listen(PORT, () => {
  logger.info(`Server is running at http://localhost:${PORT}  [env: ${app.get('env')}]`);
});

// Dọn dẹp hình ảnh mỗi 12h đêm hàng ngày
imageCleaningSchedule.start();

process.on('SIGINT', () => {
  server.close(() => {
    logger.info('Exit express server!');
    process.exit();
  });
});
