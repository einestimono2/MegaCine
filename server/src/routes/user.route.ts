import express from 'express';

import { getProfile, updateProfile, updatePassword, updateAvatar } from '../controllers';
import { isAuthenticated } from '../middlewares';

const router = express.Router();

//! .../api/v1/user

router.route('/me').get(isAuthenticated, getProfile).patch(isAuthenticated, updateProfile);

router.patch('/avatar', isAuthenticated, updateAvatar);

router.patch('/update-password', isAuthenticated, updatePassword);

export const userRouter = router;

//! My Profile
/**
 * @swagger
 * /user/me:
 *  get:
 *    tags: [User]
 *    summary: "[User] Lấy thông tin tài khoản"
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
 *              $ref: '#/components/schemas/Response'
 */

//! Cập nhật avatar
/**
 * @swagger
 * /user/avatar:
 *  patch:
 *    tags: [User]
 *    summary: "[User] Cập nhật avatar người dùng"
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
 *              - avatar
 *            properties:
 *              avatar:
 *                type: string
 *                example: ""
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Cập nhật thông tin tài khoản
/**
 * @swagger
 * /user/me:
 *  patch:
 *    tags: [User]
 *    summary: "[User] Cập nhật thông tin tài khoản"
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
 *            properties:
 *              name:
 *                type: string
 *              phoneNumber:
 *                type: string
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Đổi mật khẩu
/**
 * @swagger
 * /user/update-password:
 *  patch:
 *    tags: [User]
 *    summary: "[User] Thay đổi mật khẩu tài khoản"
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
