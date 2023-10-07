import express, { type NextFunction, type Request, type Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import timeout from 'connect-timeout';

import { Message } from './constants/message.constant';
import { ErrorMiddleware } from './middlewares';
import { i18n, swaggerDocs } from './config'; //! Import sau cookie-parser

// Routes Import
import { userRouter, authRouter, personRouter } from './routes';

//! Khởi tạo
const app = express();

//! Cấu hình
dotenv.config({
  path: 'src/config/.env'
});

//! Middlewares
app.use(timeout('5s'));
app.use(morgan('dev'));
app.use(cors({ origin: process.env.ORIGIN })); // Cors - Cross Origin Resource Sharing
app.use(express.json({ limit: '50mb' })); // Read JSON data
app.use(express.urlencoded({ extended: true })); // Can Read another data
app.use(i18n.init);
app.use((req: Request, _res: Response, next: any): void => {
  if (!req.timedout) {
    next();
  }
});

//! Routes
app.use('/api/v1', authRouter);
app.use('/api/v1', userRouter);
app.use('/api/v1/person', personRouter);

app.get('/test', (req: Request, res: Response) => {
  res.send('OK');
});

//! Swagger Documentation UI (Trước phần check unknown)
swaggerDocs(app);

//! Unknown route
app.get('*', (req: Request, _res: Response, next: NextFunction) => {
  const err: any = new Error(req.translate(Message.ROUTE_s_NOT_FOUND, req.originalUrl));
  err.statusCode = 404;

  next(err);
});

//! Middleware for errors
// Thứ tự load errorMiddleware rất quan trọng, hải gọi sau cùng, sau các app.use() và route khác (Nếu load trước các app.use() và route khác ==> Khi có lỗi, Express sẽ tìm middleware tiếp theo với 4 đối số tương ứng, bởi vì load trước các app.use() và route khác nên sẽ không sd được)
app.use(ErrorMiddleware);

export default app;
