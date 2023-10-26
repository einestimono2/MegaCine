import express, { type NextFunction, type Request, type Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import timeout from 'connect-timeout';
import swaggerUi from 'swagger-ui-express';

import { Message, HttpStatusCode } from './constants';
import { ErrorMiddleware } from './middlewares';
import { i18n, swaggerSpec } from './config'; //! Import sau cookie-parser
import logger from './utils';

// Routes Import
import {
  userRouter,
  authRouter,
  genreRouter,
  personRouter,
  managerRouter,
  movieRouter,
  productRouter
} from './routes';

//! Khởi tạo
const app = express();

//! Cấu hình
dotenv.config({
  path: 'src/config/.env'
});

//! Middlewares
app.use(timeout('15s'));
app.use(morgan('dev'));
app.use(cors({ origin: process.env.ORIGIN })); // Cors - Cross Origin Resource Sharing
app.use(express.json({ limit: '50mb' })); // Read JSON data
app.use(express.urlencoded({ extended: true })); // Can Read another data
app.use(i18n.init);
app.use(haltOnTimedout);

//! Routes
app.use('/api/v1', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/genre', genreRouter);
app.use('/api/v1/person', personRouter);
app.use('/api/v1/manager', managerRouter);
app.use('/api/v1/movie', movieRouter);
app.use('/api/v1/product', productRouter);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Swagger Documentation UI
app.get('/api/docs.json', getSwaggerJsonDocs); // Swagger Documentation JSON
logger.info(`Docs available at http://localhost:${process.env.PORT}/api/docs`);

//! Unknown route
app.get('*', handleUnknownRouter);

//! Middleware for errors
// Thứ tự load errorMiddleware rất quan trọng, phải gọi sau cùng, sau các app.use() và route khác (Nếu load trước các app.use() và route khác ==> Khi có lỗi, Express sẽ tìm middleware tiếp theo với 4 đối số tương ứng, bởi vì load trước các app.use() và route khác nên sẽ không sd được)
app.use(ErrorMiddleware);

//! Custom function
function haltOnTimedout(req: Request, _res: Response, next: NextFunction) {
  if (!req.timedout) next();
}

function handleUnknownRouter(req: Request, _res: Response, next: NextFunction) {
  const err: any = new Error(req.translate(Message.ROUTE_s_NOT_FOUND, req.originalUrl));
  err.statusCode = HttpStatusCode.NOT_FOUND_404;

  next(err);
}

function getSwaggerJsonDocs(req: Request, res: Response) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(swaggerSpec);
}

export default app;
