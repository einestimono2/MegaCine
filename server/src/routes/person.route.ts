import express from 'express';

import { createPerson, updatePerson, deletePerson, getPerson, getPersons } from '../controllers/person.controller';
import { isAuthenticated, authorizeRoles, uploadAvatar } from '../middlewares';
import { Roles } from '../constants';

const router = express.Router();
const adminRoles = [Roles.Manager, Roles.Admin];

//! .../api/v1/person
router.post('/create', isAuthenticated, authorizeRoles(...adminRoles), uploadAvatar.single('avatar'), createPerson);
router.get('/list', isAuthenticated, getPersons);

router
  .route('/details/:id')
  .put(isAuthenticated, authorizeRoles(...adminRoles), uploadAvatar.single('avatar'), updatePerson)
  .delete(isAuthenticated, authorizeRoles(...adminRoles), deletePerson)
  .get(isAuthenticated, getPerson);

export const personRouter = router;

//! Thêm mới nghệ sỹ
/**
 * @swagger
 * /api/v1/person/create:
 *  post:
 *    tags: [Person]
 *    summary: Thêm mới nghệ sỹ
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
 *              - fullName
 *            properties:
 *              fullName:
 *                type: string
 *              summary:
 *                type: string
 *              avatar:
 *                type: string
 *                format: base64
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! List Person
/**
 * @swagger
 * /api/v1/person/list:
 *  get:
 *    tags: [Person]
 *    summary: Lấy danh sách nghệ sỹ
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
 *                    persons:
 *                      example: []
 */

//! Cập nhật thông tin nghệ sỹ
/**
 * @swagger
 * /api/v1/person/details/{id}:
 *  put:
 *    tags: [Person]
 *    summary: Cập nhật thông tin nghệ sỹ
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
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            required:
 *              - fullName
 *            properties:
 *              fullName:
 *                type: string
 *              summary:
 *                type: string
 *              avatar:
 *                type: string
 *                format: base64
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Lấy thông tin nghệ sỹ
/**
 * @swagger
 * /api/v1/person/details/{id}:
 *  get:
 *    tags: [Person]
 *    summary: Thông tin chi tiết nghệ sỹ
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

//! Xóa nghệ sỹ
/**
 * @swagger
 * /api/v1/person/details/{id}:
 *  delete:
 *    tags: [Person]
 *    summary: Xóa nghệ sỹ
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
