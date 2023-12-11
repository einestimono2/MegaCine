import express from 'express';

import { authorizeRoles, isAuthenticated } from '../middlewares';
import { Roles } from '../constants';
import { theaterController } from '../controllers';

const router = express.Router();
const adminRoles = [Roles.Manager, Roles.Admin];

//! .../api/v1/theater

router.post('/create', isAuthenticated, authorizeRoles(...adminRoles), theaterController.createTheater);

router.get('/list', theaterController.getTheaters);
router.get('/list-by-city', theaterController.getTheatersByCity);
router.get('/most-rate', theaterController.getMostRateTheaters);

router.post('/nearby', theaterController.getNearByTheaters);

router
  .route('/details/:id')
  .get(theaterController.getTheaterDetails)
  .delete(isAuthenticated, authorizeRoles(...adminRoles), theaterController.deleteTheater)
  .put(isAuthenticated, authorizeRoles(...adminRoles), theaterController.updateTheater);

export const theaterRouter = router;

//! List Theater
/**
 * @swagger
 * /theater/list:
 *  get:
 *    tags: [Theater]
 *    summary: "[All] Danh sách theater"
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
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ListResponse'
 */

//! List Theater By City
/**
 * @swagger
 * /theater/list-by-city:
 *  get:
 *    tags: [Theater]
 *    summary: "[All] Danh sách rạp trong thành phố"
 *    parameters:
 *      - in: query
 *        name: hl
 *        type: string
 *        default: vi
 *        description: Ngôn ngữ trả về 'en | vi'
 *      - in: query
 *        name: city
 *        type: string
 *        description: Theo thành phố chỉ định hoặc tất cả thành phố (Không truyền)
 *      - in: query
 *        name: page
 *        type: string
 *        description: Trang hiện tại
 *      - in: query
 *        name: limit
 *        type: string
 *        description: Số lượng kết quả mỗi trang
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ListResponse'
 */

//! List Most Rate Theater
/**
 * @swagger
 * /theater/most-rate:
 *  get:
 *    tags: [Theater]
 *    summary: "[All] Top rạp đánh giá cao"
 *    parameters:
 *      - in: query
 *        name: hl
 *        type: string
 *        default: vi
 *        description: Ngôn ngữ trả về 'en | vi'
 *      - in: query
 *        name: theaterId
 *        type: string
 *        description: Bỏ qua theater chỉ định (Lấy list đánh giá cao ngoài theater đó)
 *      - in: query
 *        name: top
 *        type: string
 *        description: "Số lượng kết quả trả về (Default: 5)"
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
 * /theater/nearby:
 *  post:
 *    tags: [Theater]
 *    summary: "[All] Danh sách theater ở gần"
 *    parameters:
 *      - in: query
 *        name: hl
 *        type: string
 *        default: vi
 *        description: Ngôn ngữ trả về 'en | vi'
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

//! Create Theater
/**
 * @swagger
 * /theater/create:
 *  post:
 *    tags: [Theater]
 *    summary: "[Manager] Tạo rạp"
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
 *        application/json:
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
 *                example: ""
 *              email:
 *                type: string
 *                example: ""
 *              hotline:
 *                type: string
 *                example: ""
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
 *                example: ''
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
 *                example: ""
 *              images:
 *                type: array
 *                items:
 *                  type: string
 *                example: []
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Cập nhật theater
/**
 * @swagger
 * /theater/details/{id}:
 *  put:
 *    tags: [Theater]
 *    summary: "[Manager] Cập nhật theater"
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
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: ""
 *              email:
 *                type: string
 *                example: ""
 *              hotline:
 *                type: string
 *                example: ""
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
 *                example: ""
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
 *                example: ""
 *              images:
 *                type: array
 *                items:
 *                  type: string
 *                example: []
 *              isActive:
 *                type: boolean
 *                default: true
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
 * /theater/details/{id}:
 *  get:
 *    tags: [Theater]
 *    summary: "[All] Thông tin chi tiết theater"
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
 * /theater/details/{id}:
 *  delete:
 *    tags: [Theater]
 *    summary: "[Manager] Xóa theater"
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
