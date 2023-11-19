import path from 'path';
import express, { type NextFunction, type Request, type Response } from 'express';
import swaggerUi from 'swagger-ui-express';

import logger from '../utils';
import { Message } from '../constants';
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

const router = express.Router();
const v1 = '/api/v1';

router.use(`${v1}`, authRouter);
router.use(`${v1}/user`, userRouter);
router.use(`${v1}/genre`, genreRouter);
router.use(`${v1}/person`, personRouter);
router.use(`${v1}/manager`, managerRouter);
router.use(`${v1}/movie`, movieRouter);
router.use(`${v1}/product`, productRouter);
router.use(`${v1}/theater`, theaterRouter);
router.use(`${v1}/fare`, fareRouter);

router.use(`${v1}/upload`, uploadRouter);

//! Swagger Documentation
router.use(
  '/api/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customSiteTitle: 'MegaCine APIs',
    // customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css',
    // customfavIcon: "/assets/favicon.ico"
    customCss:
      '.swagger-ui .topbar { display: none } .swagger-ui .scheme-container .schemes { justify-content: flex-end }'
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
