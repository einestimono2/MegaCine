import express from 'express';

import { updateGenre, createGenre, getGenres, getGenre, deleteGenre } from '../controllers/genre.controller';
import { isAuthenticated, authorizeRoles } from '../middlewares';
import { Roles } from '../constants';

const router = express.Router();
const adminRoles = [Roles.Manager, Roles.Admin];

// ....api/v1/genre

// [POST] Add Genre
router.post('/create', isAuthenticated, authorizeRoles(...adminRoles), createGenre);

// [GET] List Genres
router.get('/list_genre', isAuthenticated, getGenres);

// [GET] Genre
router.get('/get_genre/:id', isAuthenticated, getGenre);

// [PUT] Update Genre
router.put('/update_genre/:id', isAuthenticated, authorizeRoles(...adminRoles), updateGenre);

// [DELETE] Delete Genre
router.delete('/delete_genre/:id', isAuthenticated, authorizeRoles(...adminRoles), deleteGenre);

export const genreRouter = router;

//! Thêm mới 1 thể loại
/**
 * @swagger
 * /api/v1/genre/create:
 *  post:
 *    tags: [Genre]
 *    summary: Thêm mới một thể loại
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
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            required:
 *              name
 *            properties:
 *              name:
 *                type: string
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! List Genre
/**
 * @swagger
 * /api/v1/genre/list_genre:
 *  get:
 *    tags: [Genre]
 *    summary: Lấy danh sách thể loại
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
 *        description: Sắp xếp (\+name, name, \-name)
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
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                message:
 *                  type: string
 *                data:
 *                  type: object
 *                  properties:
 *                    extra:
 *                      type: object
 *                      properties:
 *                        totalCount:
 *                          type: number
 *                        totalPages:
 *                          type: number
 *                        pageIndex:
 *                          type: number
 *                        pageSize:
 *                          type: number
 *                    genre:
 *                      example: []
 */

//! Lấy tên của thể loại
/**
 * @swagger
 * /api/v1/genre/get_genre/{id}:
 *  get:
 *    tags: [Genre]
 *    summary: Lấy tên của thể loại
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
 *        description: ID của genre
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Cập nhật tên thể loại
/**
 * @swagger
 * /api/v1/genre/update_genre/{id}:
 *  put:
 *    tags: [Genre]
 *    summary: Cập nhật tên thể loại
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
 *        description: ID của thể loại
 *    requestBody:
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *            properties:
 *              name:
 *                type: string
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Xóa thể loại
/**
 * @swagger
 * /api/v1/genre/delete_genre/{id}:
 *  delete:
 *    tags: [Genre]
 *    summary: Xóa thể loại
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
 *        description: ID thể loại
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */
