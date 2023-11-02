import express, { type NextFunction, type Request, type Response } from 'express';
import swaggerUi from 'swagger-ui-express';

import logger from '../utils';
import { Message } from '../constants';
import { NotFoundError } from '../models';
import { swaggerSpec } from '../config';

//! All Route
import { authRouter } from './auth.route';
import { userRouter } from './user.route';
import { genreRouter } from './genre.route';
import { managerRouter } from './manager.route';
import { movieRouter } from './movie.route';
import { personRouter } from './person.route';
import { productRouter } from './product.route';
import { uploadRouter } from './upload.route';

const router = express.Router();
const v1 = '/api/v1';

router.use(`${v1}`, authRouter);
router.use(`${v1}/user`, userRouter);
router.use(`${v1}/genre`, genreRouter);
router.use(`${v1}/person`, personRouter);
router.use(`${v1}/manager`, managerRouter);
router.use(`${v1}/movie`, movieRouter);
router.use(`${v1}/product`, productRouter);

router.use(`${v1}/upload`, uploadRouter);

//! Swagger Documentation
router.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
logger.info(`Docs available at http://localhost:${process.env.PORT}/api/docs`);

//! Unknown route
router.get('*', (req: Request, _res: Response, next: NextFunction) => {
  const message = req.translate(Message.ROUTE_s_NOT_FOUND.msg);

  next(new NotFoundError(message));
});

export default router;
