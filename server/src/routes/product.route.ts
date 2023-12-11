import express from 'express';

import { productController } from '../controllers';
import { isAuthenticated, authorizeRoles } from '../middlewares';
import { Roles } from '../constants';

const router = express.Router();
const adminRoles = [Roles.Manager, Roles.Admin];

//! .../api/v1/product

router.post('/create', isAuthenticated, authorizeRoles(...adminRoles), productController.createProduct);
// router.get('/list', isAuthenticated, authorizeRoles(Roles.Admin), productController.getProducts);
router.get('/list-by-theater/:id', productController.getProductsByTheater);
router.get('/my-theater', isAuthenticated, authorizeRoles(...adminRoles), productController.getProductsByTheater);

router
  .route('/details/:id')
  .put(isAuthenticated, authorizeRoles(...adminRoles), productController.updateProduct)
  .delete(isAuthenticated, authorizeRoles(...adminRoles), productController.deleteProduct)
  .get(isAuthenticated, authorizeRoles(...adminRoles), productController.getProduct);

export const productRouter = router;

//! Thêm mới product
/**
 * @swagger
 * /product/create:
 *  post:
 *    tags: [Product]
 *    summary: "[Manager] Thêm mới product"
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
 *              - description
 *              - price
 *              - image
 *            properties:
 *              name:
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
 *              price:
 *                type: number
 *              image:
 *                type: string
 *                example: ""
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! List Product
/**
 * @swagger
 * /product/list:
 *  get:
 *    tags: [Product]
 *    summary: "[Manager] Danh sách product"
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

//! List Product By Theater
/**
 * @swagger
 * /product/my-theater:
 *  get:
 *    tags: [Product]
 *    summary: "[Manager] Danh sách product của rạp"
 *    parameters:
 *      - in: query
 *        name: hl
 *        type: string
 *        default: vi
 *        description: Ngôn ngữ trả về 'en | vi'
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

//! List Product By Theater
/**
 * @swagger
 * /product/list-by-theater/{id}:
 *  get:
 *    tags: [Product]
 *    summary: "[All] Danh sách product của rạp"
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
 *              $ref: '#/components/schemas/ListResponse'
 */

//! Cập nhật product
/**
 * @swagger
 * /product/details/{id}:
 *  put:
 *    tags: [Product]
 *    summary: "[Manager] Cập nhật product"
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
 *        description: Product ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
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
 *              price:
 *                type: number
 *              image:
 *                type: string
 *                example: ''
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

//! Lấy thông tin product
/**
 * @swagger
 * /product/details/{id}:
 *  get:
 *    tags: [Product]
 *    summary: "[Manager] Thông tin chi tiết product"
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
 *        description: Product ID
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Xóa product
/**
 * @swagger
 * /product/details/{id}:
 *  delete:
 *    tags: [Product]
 *    summary: "[Manager] Xóa product"
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
 *        description: Product ID
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */
