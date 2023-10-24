import express from 'express';

import {
  register,
  activateUser,
  login,
  logout,
  updateAccessToken,
  socialAuth,
  resendActivationToken,
  forgotPassword,
  resetPassword
} from '../controllers';
import { isAuthenticated, verifyRefreshToken } from '../middlewares';

const router = express.Router();

//! .../api/v1

router.post('/register', register);

router.post('/activate', activateUser);
router.post('/resend-activate', resendActivationToken);

router.post('/login', login);
router.post('/social-auth', socialAuth);

router.get('/logout', isAuthenticated, logout);

router.post('/refresh', verifyRefreshToken, updateAccessToken);

router.route('/forgot-password').post(forgotPassword); // Resend - gọi lại forgotPassword
router.route('/reset-password').put(resetPassword);

export const authRouter = router;

//! Login
/**
 * @swagger
 * /api/v1/login:
 *  post:
 *    tags: [Auth]
 *    summary: Đăng nhập tài khoản
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
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: test@gmail.com
 *              password:
 *                type: string
 *                default: 123456
 *
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: test@gmail.com
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

//! Social Auth
/**
 * @swagger
 * /api/v1/social-auth:
 *  post:
 *    tags: [Auth]
 *    summary: Đăng nhập bằng MXH
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
 *              - provider
 *            properties:
 *              name:
 *                type: string
 *                default: Tester 00
 *              email:
 *                type: string
 *                default: test@gmail.com
 *              avatar:
 *                type: string
 *                default: ''
 *              provider:
 *                type: string
 *                enum: ['Google', 'Facebook']
 *                description: "Google | Facebook"
 *                default: Google
 *
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *              - provider
 *            properties:
 *              name:
 *                type: string
 *                default: Tester 00
 *              email:
 *                type: string
 *                default: test@gmail.com
 *              avatar:
 *                type: string
 *              provider:
 *                type: string
 *                enum: ['Google', 'Facebook']
 *                description: "Google | Facebook"
 *                default: Google
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
 * /api/v1/register:
 *  post:
 *    tags: [Auth]
 *    summary: Đăng ký tài khoản
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
 *              - password
 *            properties:
 *              name:
 *                type: string
 *                default: Tester 00
 *              email:
 *                type: string
 *                default: test@gmail.com
 *              password:
 *                type: string
 *                default: 123456
 *
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *              - password
 *            properties:
 *              name:
 *                type: string
 *                default: Tester 00
 *              email:
 *                type: string
 *                default: test@gmail.com
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

//! Activate
/**
 * @swagger
 * /api/v1/activate:
 *  post:
 *    tags: [Auth]
 *    summary: Kích hoạt tài khoản
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
 *              - activationToken
 *              - otp
 *            properties:
 *              activationToken:
 *                type: string
 *                default: ''
 *              otp:
 *                type: string
 *                default: ''
 *
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            required:
 *              - activationToken
 *              - otp
 *            properties:
 *              activationToken:
 *                type: string
 *              otp:
 *                type: string
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Resend Activate
/**
 * @swagger
 * /api/v1/resend-activate:
 *  post:
 *    tags: [Auth]
 *    summary: Gửi lại mã OTP kích hoạt tài khoản
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
 *              - email
 *            properties:
 *              email:
 *                type: string
 *                default: test@gmail.com
 *
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *            properties:
 *              email:
 *                type: string
 *                default: test@gmail.com
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Logout
/**
 * @swagger
 * /api/v1/logout:
 *  get:
 *    tags: [All]
 *    summary: Đăng xuất
 *    security:
 *      - BearerToken: []
 *    parameters:
 *      - in: query
 *        name: hl
 *        type: string
 *        default: vi
 *        description: Ngôn ngữ trả về 'en | vi'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Refresh
/**
 * @swagger
 * /api/v1/refresh:
 *  post:
 *    tags: [All]
 *    summary: Gia hạn assetToken
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
 *              - refreshToken
 *            properties:
 *              refreshToken:
 *                type: string
 *                default: ''
 *
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            required:
 *              - refreshToken
 *            properties:
 *              refreshToken:
 *                type: string
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Forgot
/**
 * @swagger
 * /api/v1/forgot-password:
 *  post:
 *    tags: [Auth]
 *    summary: Quên mật khẩu
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
 *              - email
 *            properties:
 *              email:
 *                type: string
 *                default: test@gmail.com
 *
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *            properties:
 *              email:
 *                type: string
 *                default: test@gmail.com
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Reset
/**
 * @swagger
 * /api/v1/reset-password:
 *  put:
 *    tags: [Auth]
 *    summary: Đặt lại mật khẩu
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
 *              - resetPasswordToken
 *              - newPassword
 *              - otp
 *            properties:
 *              resetPasswordToken:
 *                type: string
 *                default: ''
 *              newPassword:
 *                type: string
 *                default: ''
 *              otp:
 *                type: string
 *                default: ''
 *
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            required:
 *              - resetPasswordToken
 *              - newPassword
 *              - otp
 *            properties:
 *              resetPasswordToken:
 *                type: string
 *              newPassword:
 *                type: string
 *              otp:
 *                type: string
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */
