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
 * /login:
 *  post:
 *    tags: [Auth]
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
 * /social-auth:
 *  post:
 *    tags: [Auth]
 *    summary: "[All] Đăng nhập bằng MXH"
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
 * /register:
 *  post:
 *    tags: [Auth]
 *    summary: "[All] Đăng ký tài khoản"
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
 * /activate:
 *  post:
 *    tags: [Auth]
 *    summary: "[All] Kích hoạt tài khoản"
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
 * /resend-activate:
 *  post:
 *    tags: [Auth]
 *    summary: "[All] Gửi lại mã OTP kích hoạt tài khoản"
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
 * /logout:
 *  get:
 *    tags: [All]
 *    summary: "[User] Đăng xuất"
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
 * /refresh:
 *  post:
 *    tags: [All]
 *    summary: "[User] Gia hạn assetToken"
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
 * /forgot-password:
 *  post:
 *    tags: [Auth]
 *    summary: "[All] Quên mật khẩu"
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
 * /reset-password:
 *  put:
 *    tags: [Auth]
 *    summary: "[All] Đặt lại mật khẩu"
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
