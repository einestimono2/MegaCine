import express from 'express';

import { productController } from '../controllers';
import { isAuthenticated, authorizeRoles, uploadImage } from '../middlewares';
import { Roles } from '../constants';

const router = express.Router();
const adminRoles = [Roles.Manager, Roles.Admin];

//! .../api/v1/product

router.post(
  '/create',
  isAuthenticated,
  authorizeRoles(...adminRoles),
  uploadImage.single('image'),
  productController.createProduct
);
router.get(
  '/list',
  // isAuthenticated,
  productController.getProducts
);
router.get('/list/:theaterId', isAuthenticated, productController.getProductsByTheater);
router.get('/my-theater', isAuthenticated, productController.getProductsByTheater);

router
  .route('/details/:id')
  .put(isAuthenticated, authorizeRoles(...adminRoles), uploadImage.single('image'), productController.updateProduct)
  .delete(isAuthenticated, authorizeRoles(...adminRoles), productController.deleteProduct)
  .get(isAuthenticated, productController.getProduct);

export const productRouter = router;

//! Thêm mới product
/**
 * @swagger
 * /api/v1/product/create:
 *  post:
 *    tags: [Product]
 *    summary: Thêm mới product
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
 *                format: base64
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
 * /api/v1/product/list:
 *  get:
 *    tags: [Product]
 *    summary: Danh sách product
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
 * /api/v1/product/my-theater:
 *  get:
 *    tags: [Product]
 *    summary: Danh sách product của rạp
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
 * /api/v1/product/list/{theaterId}:
 *  get:
 *    tags: [Product]
 *    summary: Danh sách product của rạp
 *    parameters:
 *      - in: query
 *        name: hl
 *        type: string
 *        default: vi
 *        description: Ngôn ngữ trả về 'en | vi'
 *      - in: path
 *        name: theaterId
 *        type: string
 *        required: true
 *        description: Product ID
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

//! Cập nhật product
/**
 * @swagger
 * /api/v1/product/details/{id}:
 *  put:
 *    tags: [Product]
 *    summary: Cập nhật product
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
 *        multipart/form-data:
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
 *                format: base64
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
 * /api/v1/product/details/{id}:
 *  get:
 *    tags: [Product]
 *    summary: Thông tin chi tiết product
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

//! Xóa product
/**
 * @swagger
 * /api/v1/product/details/{id}:
 *  delete:
 *    tags: [Product]
 *    summary: Xóa product
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
