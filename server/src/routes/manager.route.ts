import express from 'express';

import { managerController } from '../controllers';
import { isAuthenticated, authorizeRoles } from '../middlewares';
import { Roles } from '../constants';

const router = express.Router();

//! .../api/v1/manager

router.post('/register', managerController.register);
router.post('/login', managerController.login);
router.put('/update-password', isAuthenticated, managerController.updatePassword);

router.get('/list', isAuthenticated, authorizeRoles(Roles.Admin), managerController.getManagers);
router.get('/approval-list', isAuthenticated, authorizeRoles(Roles.Admin), managerController.getApprovalList);

router.get('/activate/:id', isAuthenticated, authorizeRoles(Roles.Admin), managerController.activateAccount);

router
  .route('/details/:id')
  .put(isAuthenticated, authorizeRoles(Roles.Admin), managerController.updateRole)
  .delete(isAuthenticated, authorizeRoles(Roles.Admin), managerController.deleteManager)
  .get(isAuthenticated, authorizeRoles(Roles.Admin), managerController.getManager);

export const managerRouter = router;

// ---------------------------- Swagger Docs ----------------------------

//! Login
/**
 * @swagger
 * /manager/login:
 *  post:
 *    tags: [Manager]
 *    summary: "[All] Đăng nhập tài khoản"
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
 *              - code
 *              - password
 *            properties:
 *              code:
 *                type: string
 *                default: admin
 *              password:
 *                type: string
 *                default: 123456
 *
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            required:
 *              - code
 *              - password
 *            properties:
 *              code:
 *                type: string
 *                default: test
 *              password:
 *                type: string
 *                default: 123456
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Register
/**
 * @swagger
 * /manager/register:
 *  post:
 *    tags: [Manager]
 *    summary: "[All] Đăng ký rạp thành viên"
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
 *              - code
 *              - password
 *              - name
 *              - email
 *              - hotline
 *              - address
 *              - addressCode
 *              - location
 *            properties:
 *              code:
 *                type: string
 *                default: test
 *              password:
 *                type: string
 *                default: 123456
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
 *              addressCode:
 *                type: object
 *                properties:
 *                  city:
 *                    type: number
 *                    example: 1
 *                  district:
 *                    type: number
 *                    example: 1
 *                  ward:
 *                    type: number
 *                    example: 1
 *                  detail:
 *                    type: string
 *                    example: "Số nhà"
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
 *
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            required:
 *              - code
 *              - password
 *            properties:
 *              code:
 *                type: string
 *                default: test
 *              password:
 *                type: string
 *                default: 123456
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Đổi mật khẩu
/**
 * @swagger
 * /manager/update-password:
 *  put:
 *    tags: [Manager]
 *    summary: "[User] Thay đổi mật khẩu"
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
 *              - oldPassword
 *              - newPassword
 *            properties:
 *              oldPassword:
 *                type: string
 *                default: ''
 *              newPassword:
 *                type: string
 *                default: ''
 *
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            required:
 *              - oldPassword
 *              - newPassword
 *            properties:
 *              oldPassword:
 *                type: string
 *              newPassword:
 *                type: string
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Activate
/**
 * @swagger
 * /manager/activate/{id}:
 *  get:
 *    tags: [Manager]
 *    summary: "[Admin] Kích hoạt tài khoản"
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
 *        description: ID Tài khoản cần kích hoạt
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Danh sách chờ phê duyệt
/**
 * @swagger
 * /manager/approval-list:
 *  get:
 *    tags: [Manager]
 *    summary: "[Admin] Lấy danh quản lý đang đợt phê duyệt"
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
 *      - in: query
 *        name: role
 *        type: string
 *        default: MANAGER
 *        description: Lấy theo role
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

//! List Managers
/**
 * @swagger
 * /manager/list:
 *  get:
 *    tags: [Manager]
 *    summary: "[Admin] Lấy danh sách quản lý"
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
 *      - in: query
 *        name: role
 *        type: string
 *        default: MANAGER
 *        description: Lấy theo role
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

//! Lấy thông tin quản lý
/**
 * @swagger
 * /manager/details/{id}:
 *  get:
 *    tags: [Manager]
 *    summary: "[Admin] Lấy thông tin quản lý"
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
 *        description: ID của quản lý
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Cập nhật role quản lý
/**
 * @swagger
 * /manager/details/{id}:
 *  put:
 *    tags: [Manager]
 *    summary: "[Admin] Cập nhật role"
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
 *        description: ID quản lý
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - role
 *            properties:
 *              role:
 *                type: string
 *                default: MANAGER
 *
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            required:
 *              - role
 *            properties:
 *              name:
 *                type: string
 *                default: MANAGER
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Xóa quản lý
/**
 * @swagger
 * /manager/details/{id}:
 *  delete:
 *    tags: [Manager]
 *    summary: "[Admin] Xóa quản lý"
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
 *        description: ID quản lý
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */
