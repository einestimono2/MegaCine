import express from 'express';

import { getProfile, updateProfile, updatePassword, updateAvatar } from '../controllers';
import { isAuthenticated, uploadImage } from '../middlewares';

const router = express.Router();

// .../api/v1/user
router
  .route('/me')
  .get(isAuthenticated, getProfile)
  .put(isAuthenticated, uploadImage.single('avatar'), updateProfile);

router.put('/avatar', isAuthenticated, uploadImage.single('avatar'), updateAvatar);

router.put('/update-password', isAuthenticated, updatePassword);

export const userRouter = router;

//! My Profile
/**
 * @swagger
 * /api/v1/user/me:
 *  get:
 *    tags: [User]
 *    summary: Lấy thông tin tài khoản
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
 * /api/v1/user/avatar:
 *  put:
 *    tags: [User]
 *    summary: Cập nhật avatar người dùng
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
 *              - avatar
 *            properties:
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

//! Cập nhật thông tin tài khoản
/**
 * @swagger
 * /api/v1/user/me:
 *  put:
 *    tags: [User]
 *    summary: Cập nhật thông tin tài khoản
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
 *            properties:
 *              name:
 *                type: string
 *              phoneNumber:
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

//! Đổi mật khẩu
/**
 * @swagger
 * /api/v1/user/update-password:
 *  put:
 *    tags: [User]
 *    summary: Thay đổi mật khẩu tài khoản
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
