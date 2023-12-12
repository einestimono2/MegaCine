import express from 'express';

import { createPerson, updatePerson, deletePerson, getPerson, getPersons } from '../controllers/person.controller';
import { isAuthenticated, authorizeRoles } from '../middlewares';
import { Roles } from '../constants';

const router = express.Router();
const adminRoles = [Roles.Manager, Roles.Admin];

//! .../api/v1/person
router.post('/create', isAuthenticated, authorizeRoles(...adminRoles), createPerson);
router.get('/list', isAuthenticated, authorizeRoles(...adminRoles), getPersons);

router
  .route('/details/:id')
  .put(isAuthenticated, authorizeRoles(...adminRoles), updatePerson)
  .delete(isAuthenticated, authorizeRoles(...adminRoles), deletePerson)
  .get(getPerson);

export const personRouter = router;

//! Thêm mới nghệ sỹ
/**
 * @swagger
 * /person/create:
 *  post:
 *    tags: [Person]
 *    summary: "[Manager] Thêm mới nghệ sỹ"
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
 *              - fullName
 *            properties:
 *              fullName:
 *                type: string
 *              summary:
 *                type: object
 *                properties:
 *                  en:
 *                    type: string
 *                    example: ''
 *                  vi:
 *                    type: string
 *                    example: ''
 *              avatar:
 *                type: string
 *                example: ''
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! List Person
/**
 * @swagger
 * /person/list:
 *  get:
 *    tags: [Person]
 *    summary: "[Manager] Lấy danh sách nghệ sỹ"
 *    security:
 *      - BearerToken: []
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

//! Cập nhật thông tin nghệ sỹ
/**
 * @swagger
 * /person/details/{id}:
 *  put:
 *    tags: [Person]
 *    summary: "[Manager] Cập nhật thông tin nghệ sỹ"
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
 *        description: ID nghệ sỹ
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - fullName
 *            properties:
 *              fullName:
 *                type: string
 *              summary:
 *                type: object
 *                properties:
 *                  en:
 *                    type: string
 *                    example: ''
 *                  vi:
 *                    type: string
 *                    example: ''
 *              avatar:
 *                type: string
 *                example: ''
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Lấy thông tin nghệ sỹ
/**
 * @swagger
 * /person/details/{id}:
 *  get:
 *    tags: [Person]
 *    summary: "[All] Thông tin chi tiết nghệ sỹ"
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
 *        description: ID nghệ sỹ
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Xóa nghệ sỹ
/**
 * @swagger
 * /person/details/{id}:
 *  delete:
 *    tags: [Person]
 *    summary: "[Manager] Xóa nghệ sỹ"
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
 *        description: ID nghệ sỹ
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */
