import dotenv from 'dotenv';
import express, { type NextFunction, type Request, type Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import timeout from 'connect-timeout';
import helmet from 'helmet';
import compression from 'compression';

import { ErrorMiddleware } from './middlewares';
import { i18n } from './config'; //! Import sau cookie-parser
import { checkOverload, imageCleaningSchedule } from './utils';
import routers from './routes';
import { instanceDb } from './dbs';

//! Cấu hình env
dotenv.config();

//! Khởi tạo
const app = express();

//! Middlewares
app.use(timeout('15s'));
app.use(morgan('dev'));
app.use(helmet());
app.use(compression()); // Nén dữ liệu - Giảm kích thước response trả về
app.use(cors()); // Cors - Cross Origin Resource Sharing
app.use(express.json({ limit: '50mb' })); // Read JSON data
app.use(express.urlencoded({ extended: true })); // Can Read another data
app.use(i18n.init);
app.use(haltOnTimedout);

//! Database
instanceDb.connect();
checkOverload();

//! Dọn dẹp hình ảnh mỗi 12h đêm hàng ngày
imageCleaningSchedule.start();

//! Routes + Unknown route
app.use('', routers);

//! Middleware for errors
// Thứ tự load errorMiddleware rất quan trọng, phải gọi sau cùng, sau các app.use() và route khác (Nếu load trước các app.use() và route khác ==> Khi có lỗi, Express sẽ tìm middleware tiếp theo với 4 đối số tương ứng, bởi vì load trước các app.use() và route khác nên sẽ không sd được)
app.use(ErrorMiddleware);

//! Custom function
function haltOnTimedout(req: Request, _res: Response, next: NextFunction) {
  if (!req.timedout) next();
}

export default app;
