export * from './response/error.response';
export * from './response/success.response';

export { TheaterModel } from './theater.model';
export { UserModel } from './user.model';
export { MovieModel } from './movie.model';
export { GenreModel } from './genre.model';
export { ManagerModel } from './manager.model';
export { PersonModel } from './person.model';
export { ProductModel } from './product.model';
export { FareModel } from './fare.model';

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
