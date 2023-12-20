import express from 'express';

import { isAuthenticated, authorizeRoles } from '../middlewares';
import { Roles } from '../constants';
import { reviewController } from '../controllers';

const router = express.Router();
const adminRoles = [Roles.Manager, Roles.Admin];

//! .../api/v1/review

// [POST] Create Review
router.post('/create', isAuthenticated, reviewController.createOrUpdateReview);

// [GET] List Movie Review
router.get('/list-by-movie/:id', reviewController.getReviewsByMovie);
// [GET] List Theater Review
router.get('/list-by-theater/:id', reviewController.getReviewsByTheater);

// [GET] Toggle Active Review
router.get('/toggle-active/:id', isAuthenticated, authorizeRoles(...adminRoles), reviewController.toggleActiveReview);

// [DELETE] Delete Review
router.delete('/details/:id', isAuthenticated, authorizeRoles(...adminRoles), reviewController.deleteReview);

export const reviewRouter = router;

//! Danh sách đánh giá của phim
/**
 * @swagger
 * /review/list-by-movie/{id}:
 *  get:
 *    tags: [Review]
 *    summary: "[All] Lấy danh sách đánh giá của phim (isActive=true)"
 *    parameters:
 *      - in: query
 *        name: hl
 *        type: string
 *        default: vi
 *        description: Ngôn ngữ trả về 'en | vi'
 *      - in: query
 *        name: page
 *        type: string
 *        description: Trang hiện tại
 *      - in: query
 *        name: limit
 *        type: string
 *        description: Số lượng kết quả mỗi trang
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: Movie ID
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Danh sách đánh giá của rạp
/**
 * @swagger
 * /review/list-by-theater/{id}:
 *  get:
 *    tags: [Review]
 *    summary: "[All] Lấy danh sách đánh giá của rạp (isActive=true)"
 *    parameters:
 *      - in: query
 *        name: hl
 *        type: string
 *        default: vi
 *        description: Ngôn ngữ trả về 'en | vi'
 *      - in: query
 *        name: page
 *        type: string
 *        description: Trang hiện tại
 *      - in: query
 *        name: limit
 *        type: string
 *        description: Số lượng kết quả mỗi trang
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

//! Tạo đánh giá
/**
 * @swagger
 * /review/create:
 *  post:
 *    tags: [Review]
 *    summary: "[User] Đánh giá hoặc cập nhật phim/rạp"
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
 *              - rating
 *              - message
 *            properties:
 *              rating:
 *                type: number
 *                description: Phim (0-10), Rạp (0-5)
 *              message:
 *                type: string
 *                default: ""
 *              theater:
 *                type: string
 *                default: ""
 *              movie:
 *                type: string
 *                default: ""
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Cập nhật trạng thái
/**
 * @swagger
 * /review/toggle-active/{id}:
 *  get:
 *    tags: [Review]
 *    summary: "[Manager] Cập nhật trạng thái đánh giá"
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
 *        description: Review ID
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Xóa đánh giá
/**
 * @swagger
 * /review/details/{id}:
 *  delete:
 *    tags: [Review]
 *    summary: "[Manager] Xóa đánh giá"
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
 *        description: Review ID
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */
