import express from 'express';

import { isAuthenticated, authorizeRoles } from '../middlewares';
import { Roles } from '../constants';
import { showtimeController } from '../controllers';

const router = express.Router();
const adminRoles = [Roles.Manager, Roles.Admin];

//! .../api/v1/showtime

// [POST] Add Showtime
router.post('/create', isAuthenticated, authorizeRoles(...adminRoles), showtimeController.createShowtime);

// [GET] List Showtime By Movie
// router.get('/list', showtimeController.getShowtimes);
// [GET] List Showtime By Movie
router.get('/list-by-movie/:id', showtimeController.getShowtimesByMovie);
// [GET] List Showtime By Theater
router.get('/list-by-theater/:id', showtimeController.getShowtimesByTheater);

router
  .route('/details/:id')
  // [PATCH] Update Showtime
  .patch(isAuthenticated, authorizeRoles(...adminRoles), showtimeController.updateShowtime)
  // [DELETE] Delete Showtime
  .delete(isAuthenticated, authorizeRoles(...adminRoles), showtimeController.deleteShowtime)
  // [GET] Showtime Details
  .get(showtimeController.getShowtimeDetails);

export const showtimeRouter = router;

//! Danh sách lịch chiếu theo movie
/**
 * @swagger
 * /showtime/list-by-movie/{id}:
 *  get:
 *    tags: [Showtime]
 *    summary: "[All] Lấy danh sách lịch chiếu theo phim"
 *    parameters:
 *      - in: query
 *        name: hl
 *        type: string
 *        default: vi
 *        description: Ngôn ngữ trả về 'en | vi'
 *      - in: query
 *        name: date
 *        type: string
 *        description: Tìm theo ngày (YYYY-mm-dd)
 *      - in: query
 *        name: location
 *        type: string
 *        description: Tìm theo địa điểm (Thành phố)
 *      - in: query
 *        name: format
 *        type: string
 *        description: Tìm theo định dạng (2D | 3D)
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

//! Danh sách lịch chiếu theo theater
/**
 * @swagger
 * /showtime/list-by-theater/{id}:
 *  get:
 *    tags: [Showtime]
 *    summary: "[All] Lấy danh sách lịch chiếu theo rạp"
 *    parameters:
 *      - in: query
 *        name: hl
 *        type: string
 *        default: vi
 *        description: Ngôn ngữ trả về 'en | vi'
 *      - in: query
 *        name: date
 *        type: string
 *        description: Tìm theo ngày (YYYY-mm-dd)
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

//! Thêm lịch chiếu
/**
 * @swagger
 * /showtime/create:
 *  post:
 *    tags: [Showtime]
 *    summary: "[Manager] Thêm lịch chiếu"
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
 *              - startTime
 *              - movie
 *              - theater
 *              - room
 *              - language
 *            properties:
 *              movie:
 *                type: string
 *                default: ""
 *              theater:
 *                type: string
 *                default: ""
 *              room:
 *                type: string
 *                default: ""
 *              startTime:
 *                type: string
 *                format: date-time
 *              endTime:
 *                type: string
 *                format: date-time
 *              type:
 *                type: string
 *                description: "Normal | Sneakshow"
 *                "enum": [ "Normal", "Sneakshow"]
 *              language:
 *                type: string
 *                description: "Subtitles | Dubbing"
 *                "enum": [ "Subtitles", "Dubbing"]
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Cập nhật lịch chiếu
/**
 * @swagger
 * /showtime/details/{id}:
 *  patch:
 *    tags: [Showtime]
 *    summary: "[Manager] Cập nhật lịch chiếu"
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
 *        description: Showtime ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              startTime:
 *                type: string
 *                format: date-time
 *              endTime:
 *                type: string
 *                format: date-time
 *              isActive:
 *                type: boolean
 *                default: true
 *              type:
 *                type: string
 *                description: "Normal | Sneakshow"
 *                "enum": [ "Normal", "Sneakshow"]
 *              language:
 *                type: string
 *                description: "Subtitles | Dubbing"
 *                "enum": [ "Subtitles", "Dubbing"]
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Thông tin lịch chiếu
/**
 * @swagger
 * /showtime/details/{id}:
 *  get:
 *    tags: [Showtime]
 *    summary: "[All] Thông tin lịch chiếu"
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
 *        description: Showtime ID
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Xóa lịch chiếu
/**
 * @swagger
 * /showtime/details/{id}:
 *  delete:
 *    tags: [Showtime]
 *    summary: "[Manager] Xóa lịch chiếu"
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
 *        description: Showtime ID
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */
