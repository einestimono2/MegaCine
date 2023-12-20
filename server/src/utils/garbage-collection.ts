import cron from 'node-cron';
import fs from 'fs';
import path from 'path';

import { logger } from './logger';

const UPLOADS_FOLDER = path.join(__dirname, '../uploads');
const IGNORE_FILES = ['.gitkeep'];

// Chạy task dọn dẹp hình ảnh mỗi ngày vào 00:00
// * * * * *
// 0 0 0 * * *
export const imageCleaningSchedule = cron.schedule('0 0 0 * * *', () => {
  logger.info('-----> Start cleaning up images <-----');

  fs.readdir(UPLOADS_FOLDER, (err, files) => {
    if (err) {
      throw err;
    }

    for (const file of files) {
      if (!IGNORE_FILES.includes(file)) {
        fs.unlink(path.join(UPLOADS_FOLDER, file), (err) => {
          if (err) throw err;
        });
      }
    }
  });

  logger.info('-----> End cleaning up images <-----');
});
