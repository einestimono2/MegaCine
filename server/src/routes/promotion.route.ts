import express from 'express';

import { isAuthenticated, authorizeRoles } from '../middlewares';
import { Roles } from '../constants';
import { promotionController } from '../controllers';

const router = express.Router();
const adminRoles = [Roles.Manager, Roles.Admin];

//! .../api/v1/promotion

// [POST] Add Promotion
router.post('/create', isAuthenticated, authorizeRoles(...adminRoles), promotionController.createPromotion);

// [GET] List Promotion Of Theater
router.get('/list-by-theater/:id', promotionController.getPromotionsByTheater);
// [GET] List Promotion Of My Theater
router.get('/my-theater', isAuthenticated, authorizeRoles(...adminRoles), promotionController.getMyTheaterPromotions);

router
  .route('/details/:id')
  // [PATCH] Update Promotion
  .patch(isAuthenticated, authorizeRoles(...adminRoles), promotionController.updatePromotion)
  // [DELETE] Delete Promotion
  .delete(isAuthenticated, authorizeRoles(...adminRoles), promotionController.deletePromotion)
  // [GET] Promotion Details
  .get(promotionController.getPromotionDetails);

export const promotionRouter = router;

//! Danh sách khuyến mãi của rạp
/**
 * @swagger
 * /promotion/list-by-theater/{id}:
 *  get:
 *    tags: [Promotion]
 *    summary: "[All] Danh sách khuyến mãi của rạp (isActive=true)"
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
 *              $ref: '#/components/schemas/Response'
 */

//! Danh sách khuyến mãi của rạp tôi
/**
 * @swagger
 * /promotion/my-theater:
 *  get:
 *    tags: [Promotion]
 *    summary: "[Manager] Danh sách khuyến mãi rạp (All)"
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

//! Thêm khuyến mãi
/**
 * @swagger
 * /promotion/create:
 *  post:
 *    tags: [Promotion]
 *    summary: "[Manager] Thêm khuyến mãi"
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
 *              - title
 *              - content
 *              - startTime
 *            properties:
 *              code:
 *                type: string
 *                default: ""
 *              title:
 *                type: string
 *                default: ""
 *              content:
 *                type: string
 *                default: ""
 *              startTime:
 *                type: string
 *                format: date-time
 *              endTime:
 *                type: string
 *                format: date-time
 *              thumbnail:
 *                type: string
 *                default: ""
 *              value:
 *                type: number
 *              type:
 *                type: string
 *                description: "Amount | Percentage"
 *                "enum": [ "Amount", "Percentage"]
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Cập nhật khuyến mãi
/**
 * @swagger
 * /promotion/details/{id}:
 *  patch:
 *    tags: [Promotion]
 *    summary: "[Manager] Cập nhật khuyến mãi"
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
 *        description: Promotion ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              code:
 *                type: string
 *                default: ""
 *              title:
 *                type: string
 *                default: ""
 *              content:
 *                type: string
 *                default: ""
 *              startTime:
 *                type: string
 *                format: date-time
 *              endTime:
 *                type: string
 *                format: date-time
 *              thumbnail:
 *                type: string
 *                default: ""
 *              value:
 *                type: number
 *              type:
 *                type: string
 *                description: "Amount | Percentage"
 *                "enum": [ "Amount", "Percentage"]
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

//! Thông tin khuyến mãi
/**
 * @swagger
 * /promotion/details/{id}:
 *  get:
 *    tags: [Promotion]
 *    summary: "[All] Chi tiết khuyến mãi"
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
 *        description: Promotion ID
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Xóa khuyến mãi
/**
 * @swagger
 * /promotion/details/{id}:
 *  delete:
 *    tags: [Promotion]
 *    summary: "[Manager] Xóa khuyến mãi"
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
 *        description: Promotion ID
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */
