import path from 'path';
import express, { type NextFunction, type Request, type Response } from 'express';
import swaggerUi from 'swagger-ui-express';

import logger from '../utils';
import { API_VERSION, Message } from '../constants';
import { NotFoundError } from '../models';
import { swaggerSpec, app } from '../config';

//! All Route
import { authRouter } from './auth.route';
import { userRouter } from './user.route';
import { genreRouter } from './genre.route';
import { managerRouter } from './manager.route';
import { movieRouter } from './movie.route';
import { personRouter } from './person.route';
import { productRouter } from './product.route';
import { uploadRouter } from './upload.route';
import { theaterRouter } from './theater.route';
import { fareRouter } from './fare.route';
import { roomRouter } from './room.route';
import { showtimeRouter } from './showtime.route';
import { promotionRouter } from './promotion.route';
import { reviewRouter } from './review.route';

const router = express.Router();

router.use(`${API_VERSION}`, authRouter);
router.use(`${API_VERSION}/user`, userRouter);
router.use(`${API_VERSION}/genre`, genreRouter);
router.use(`${API_VERSION}/person`, personRouter);
router.use(`${API_VERSION}/manager`, managerRouter);
router.use(`${API_VERSION}/movie`, movieRouter);
router.use(`${API_VERSION}/product`, productRouter);
router.use(`${API_VERSION}/theater`, theaterRouter);
router.use(`${API_VERSION}/fare`, fareRouter);
router.use(`${API_VERSION}/room`, roomRouter);
router.use(`${API_VERSION}/showtime`, showtimeRouter);
router.use(`${API_VERSION}/promotion`, promotionRouter);
router.use(`${API_VERSION}/review`, reviewRouter);

router.use(`${API_VERSION}/upload`, uploadRouter);

//! Swagger Documentation
router.use(
  '/api/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customSiteTitle: 'MegaCine APIs',
    // customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css',
    // customfavIcon: "/assets/favicon.ico"
    customCss:
      '.swagger-ui .topbar { display: none } .swagger-ui .scheme-container .schemes { justify-content: space-between }'
  })
);
logger.info(`Docs available at http://localhost:${app.port}/api/docs`);

//! Static - Import trước check Unknown route
router.use('/files', express.static(path.join(__dirname, '../uploads')));

//! Unknown route
router.get('*', (req: Request, res: Response, next: NextFunction) => {
  const message = res.translate(Message.ROUTE_s_NOT_FOUND.msg, req.originalUrl);

  next(new NotFoundError(message));
});

export default router;

/**
 * @swagger
 * components:
 *  schemas:
 *    Response:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *        message:
 *          type: string
 *        data:
 *          type: object
 *    ListResponse:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *        message:
 *          type: string
 *        data:
 *          type: array
 *          example: []
 *        extra:
 *          type: object
 *          properties:
 *            totalCount:
 *              type: number
 *            totalPages:
 *              type: number
 *            pageIndex:
 *              type: number
 *            pageSize:
 *              type: number
 */
