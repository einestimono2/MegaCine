import express from 'express';

import { bookingController } from '../controllers';
import { isAuthenticatedOrNot, isAuthenticated, authorizeRoles } from '../middlewares';
import { Roles } from '../constants';

const router = express.Router();
const adminRoles = [Roles.Manager, Roles.Admin];

//! .../api/v1/booking

// [POST] Create Booking
router.post('/create', isAuthenticatedOrNot, bookingController.createBooking);

// [GET] List All Bookings
router.get(
  '/list',
  // isAuthenticated, authorizeRoles(Roles.Admin),
  bookingController.getBookings
);
router.get(
  '/my-bookings',
  // isAuthenticated,
  bookingController.getBookingsByUser
);
router.get(
  '/my-theater',
  // isAuthenticated,
  // authorizeRoles(...adminRoles),
  bookingController.getBookingsByTheater
);

router
  .route('/details/:id')
  // [GET] Booking Details
  .get(isAuthenticated, bookingController.getBookingDetails)
  // [PATCH] Update Booking
  // .patch(isAuthenticated, authorizeRoles(...adminRoles), bookingController.updateBooking);
  // [DELETE] Delete Booking
  .delete(isAuthenticated, authorizeRoles(...adminRoles), bookingController.deleteBooking);

export const bookingRouter = router;

//! Create booking
/**
 * @swagger
 * /booking/create:
 *  post:
 *    tags: [Booking]
 *    summary: "[User] Tạo booking"
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
 *              - showtime
 *              - theater
 *              - room
 *              - seats
 *              - payment
 *            properties:
 *              user:
 *                type: string
 *                example: ""
 *              email:
 *                type: string
 *                example: ""
 *              phoneNumber:
 *                type: string
 *                example: ""
 *              showtime:
 *                type: number
 *                example: ""
 *              theater:
 *                type: string
 *                example: ""
 *              room:
 *                type: string
 *                example: ""
 *              seats:
 *                type: array
 *                items:
 *                  type: string
 *                example: []
 *              products:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    quantity:
 *                      type: number
 *                    item:
 *                      type: string
 *                      example: ''
 *              payment:
 *                type: object
 *                required:
 *                  - totalPrice
 *                properties:
 *                  promotion:
 *                    type: string
 *                    example: ''
 *                  discountAmount:
 *                    type: number
 *                  totalPrice:
 *                    type: number
 *                  method:
 *                    type: string
 *                    enum: ['Cash', 'Card', 'Vnpay']
 *                    description: "Cash | Card | Vnpay"
 *                    default: Card
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! List booking
/**
 * @swagger
 * /booking/list:
 *  get:
 *    tags: [Booking]
 *    summary: "[Admin] Danh sách tất cả booking"
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

//! List booking by theater
/**
 * @swagger
 * /booking/my-theater:
 *  get:
 *    tags: [Booking]
 *    summary: "[Manager] Danh sách booking của rạp"
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

//! List booking By user
/**
 * @swagger
 * /booking/my-bookings:
 *  get:
 *    tags: [Booking]
 *    summary: "[User] Lịch sử đặt vé của người dùng"
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
 *              $ref: '#/components/schemas/ListResponse'
 */

//! Booking details
/**
 * @swagger
 * /booking/details/{id}:
 *  get:
 *    tags: [Booking]
 *    summary: "[User] Thông tin đặt vé chi tiết"
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
 *        description: Booking ID
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Delete booking
/**
 * @swagger
 * /booking/details/{id}:
 *  delete:
 *    tags: [Booking]
 *    summary: "[Manager] Xóa booking"
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
 *        description: Booking ID
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */
