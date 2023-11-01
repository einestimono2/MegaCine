import express, { type NextFunction, type Request, type Response } from 'express';
import swaggerUi from 'swagger-ui-express';

import logger from '../utils';
import { Message } from '../constants';

//! All Route
import { authRouter } from './auth.route';
import { userRouter } from './user.route';
import { genreRouter } from './genre.route';
import { managerRouter } from './manager.route';
import { movieRouter } from './movie.route';
import { personRouter } from './person.route';
import { productRouter } from './product.route';
import { swaggerSpec } from '../config';
import { NotFoundError } from '../models';

const router = express.Router();

router.use('/api/v1', authRouter);
router.use('/api/v1/user', userRouter);
router.use('/api/v1/genre', genreRouter);
router.use('/api/v1/person', personRouter);
router.use('/api/v1/manager', managerRouter);
router.use('/api/v1/movie', movieRouter);
router.use('/api/v1/product', productRouter);

//! Swagger Documentation
router.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
logger.info(`Docs available at http://localhost:${process.env.PORT}/api/docs`);

//! Unknown route
router.get('*', (req: Request, _res: Response, next: NextFunction) => {
  const message = req.translate(Message.ROUTE_s_NOT_FOUND.msg);

  next(new NotFoundError(message));
});

export default router;
