import express from 'express';

import { authorizeRoles, isAuthenticated, uploadImage } from '../middlewares';
import { Roles } from '../constants';
import { theaterController } from '../controllers';

const router = express.Router();
const adminRoles = [Roles.Manager, Roles.Admin];

//! .../api/v1/theater

router.post(
  '/create',
  isAuthenticated,
  authorizeRoles(...adminRoles),
  uploadImage.fields([{ name: 'logo' }, { name: 'images', maxCount: 8 }]),
  theaterController.createTheater
);

router.get('/list', theaterController.getTheaters);

router.post('/nearby', theaterController.getNearByTheaters);

router
  .route('/details/:id')
  .get(theaterController.getTheaterDetails)
  .delete(isAuthenticated, authorizeRoles(...adminRoles), theaterController.deleteTheater)
  .put(
    // isAuthenticated,
    // authorizeRoles(...adminRoles),
    uploadImage.fields([{ name: 'logo' }, { name: 'images', maxCount: 8 }]),
    theaterController.updateTheater
  );

export const theaterRouter = router;

//! Create Theater
/**
 * @swagger
 * /api/v1/theater/create:
 *  post:
 *    tags: [Theater]
 *    summary: Tạo rạp
 *    security:
 *      - BearerToken: []
 *    parameters:
 *      - in: query
 *        name: hl
 *        type: string
 *        default: vi
 *        description: Ngôn ngữ trả về 'en | vi'
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *              - hotline
 *              - address
 *              - location
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *              hotline:
 *                type: string
 *              description:
 *                type: object
 *                properties:
 *                  en:
 *                    type: string
 *                    example: ''
 *                  vi:
 *                    type: string
 *                    example: ''
 *              address:
 *                type: string
 *              location:
 *                type: object
 *                description: "type: Point, coordinates: [long, lat]"
 *                properties:
 *                  type:
 *                    type: string
 *                    example: 'Point'
 *                  coordinates:
 *                    type: array
 *                    example: [105.804817, 21.028511]
 *              logo:
 *                type: string
 *                format: binary
 *              images:
 *                type: array
 *                items:
 *                  type: string
 *                  format: binary
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! List Theater
/**
 * @swagger
 * /api/v1/theater/list:
 *  get:
 *    tags: [Theater]
 *    summary: Danh sách theater
 *    parameters:
 *      - in: query
 *        name: hl
 *        type: string
 *        default: vi
 *        description: Ngôn ngữ trả về 'en | vi'
 *      - in: query
 *        name: keyword
 *        type: string
 *        description: Tìm theo tên
 *      - in: query
 *        name: page
 *        type: string
 *        description: Trang hiện tại
 *      - in: query
 *        name: limit
 *        type: string
 *        description: Số lượng kết quả mỗi trang
 *      - in: query
 *        name: sort
 *        type: string
 *        hint: ht
 *        description: Sắp xếp (\+fullName, fullName, \-fullName)
 *      - in: query
 *        name: fields
 *        type: string
 *        description: Giới hạn trường trả về (cách nhau bởi dấu phẩy)
 *    security:
 *      - BearerToken: []
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ListResponse'
 */

//! Near By Theater
/**
 * @swagger
 * /api/v1/theater/nearby:
 *  post:
 *    tags: [Theater]
 *    summary: Danh sách theater ở gần
 *    parameters:
 *      - in: query
 *        name: hl
 *        type: string
 *        default: vi
 *        description: Ngôn ngữ trả về 'en | vi'
 *    security:
 *      - BearerToken: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - longitude
 *              - latitude
 *            properties:
 *              longitude:
 *                type: number
 *              latitude:
 *                type: number
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            required:
 *              - longitude
 *              - latitude
 *            properties:
 *              longitude:
 *                type: number
 *              latitude:
 *                type: number
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ListResponse'
 */

//! Cập nhật theater
/**
 * @swagger
 * /api/v1/theater/details/{id}:
 *  put:
 *    tags: [Theater]
 *    summary: Cập nhật theater
 *    security:
 *      - BearerToken: []
 *    parameters:
 *      - in: query
 *        name: hl
 *        type: string
 *        default: vi
 *        description: Ngôn ngữ trả về 'en | vi'
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: Theater ID
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *              hotline:
 *                type: string
 *              description:
 *                type: object
 *                properties:
 *                  en:
 *                    type: string
 *                    example: ''
 *                  vi:
 *                    type: string
 *                    example: ''
 *              address:
 *                type: string
 *              location:
 *                type: object
 *                description: "type: Point, coordinates: [long, lat]"
 *                properties:
 *                  type:
 *                    type: string
 *                    example: 'Point'
 *                  coordinates:
 *                    type: array
 *                    example: [105.804817, 21.028511]
 *              logo:
 *                type: string
 *                format: binary
 *              images:
 *                type: array
 *                items:
 *                  type: string
 *                  format: binary
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Lấy thông tin theater
/**
 * @swagger
 * /api/v1/theater/details/{id}:
 *  get:
 *    tags: [Theater]
 *    summary: Thông tin chi tiết theater
 *    security:
 *      - BearerToken: []
 *    parameters:
 *      - in: query
 *        name: hl
 *        type: string
 *        default: vi
 *        description: Ngôn ngữ trả về 'en | vi'
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: Theater ID
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Xóa theater
/**
 * @swagger
 * /api/v1/theater/details/{id}:
 *  delete:
 *    tags: [Theater]
 *    summary: Xóa theater
 *    security:
 *      - BearerToken: []
 *    parameters:
 *      - in: query
 *        name: hl
 *        type: string
 *        default: vi
 *        description: Ngôn ngữ trả về 'en | vi'
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: Theater ID
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */
