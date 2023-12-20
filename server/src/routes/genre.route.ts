import express from 'express';

import { updateGenre, createGenre, getGenres, getGenre, deleteGenre } from '../controllers/genre.controller';
import { isAuthenticated, authorizeRoles } from '../middlewares';
import { Roles } from '../constants';

const router = express.Router();
const adminRoles = [Roles.Manager, Roles.Admin];

//! .../api/v1/genre

// [POST] Add Genre
router.post('/create', isAuthenticated, authorizeRoles(...adminRoles), createGenre);

// [GET] List Genres
router.get('/list', getGenres);

// [GET] Genre
router.get('/details/:id', getGenre);

// [PUT] Update Genre
router.put('/details/:id', isAuthenticated, authorizeRoles(...adminRoles), updateGenre);

// [DELETE] Delete Genre
router.delete('/details/:id', isAuthenticated, authorizeRoles(...adminRoles), deleteGenre);

export const genreRouter = router;

//! Thêm mới 1 thể loại
/**
 * @swagger
 * /genre/create:
 *  post:
 *    tags: [Genre]
 *    summary: "[Manager] Thêm mới một thể loại"
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
 *            properties:
 *              name:
 *                type: object
 *                properties:
 *                  en:
 *                    type: string
 *                    example: Action
 *                  vi:
 *                    type: string
 *                    example: Hành động
 *
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *            properties:
 *              name:
 *                type: object
 *                properties:
 *                  en:
 *                    type: string
 *                    example: Action
 *                  vi:
 *                    type: string
 *                    example: Hành động
 *
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! List Genre
/**
 * @swagger
 * /genre/list:
 *  get:
 *    tags: [Genre]
 *    summary: "[All] Lấy danh sách thể loại"
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
 *              $ref: '#/components/schemas/ListResponse'
 */

//! Lấy tên của thể loại
/**
 * @swagger
 * /genre/details/{id}:
 *  get:
 *    tags: [Genre]
 *    summary: "[All] Lấy tên của thể loại"
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
 * /genre/details/{id}:
 *  put:
 *    tags: [Genre]
 *    summary: "[Manager] Cập nhật tên thể loại"
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
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *            properties:
 *              name:
 *                type: object
 *                properties:
 *                  en:
 *                    type: string
 *                    example: Action
 *                  vi:
 *                    type: string
 *                    example: Hành động
 *
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *            properties:
 *              name:
 *                type: object
 *                properties:
 *                  en:
 *                    type: string
 *                    example: Action
 *                  vi:
 *                    type: string
 *                    example: Hành động
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Xóa thể loại
/**
 * @swagger
 * /genre/details/{id}:
 *  delete:
 *    tags: [Genre]
 *    summary: "[Manager] Xóa thể loại"
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
