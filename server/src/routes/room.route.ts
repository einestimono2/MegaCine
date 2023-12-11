import express from 'express';

import { isAuthenticated, authorizeRoles } from '../middlewares';
import { Roles } from '../constants';
import { roomController } from '../controllers';

const router = express.Router();
const adminRoles = [Roles.Manager, Roles.Admin];

//! .../api/v1/room

// [POST] Add Room
router.post('/create', isAuthenticated, authorizeRoles(...adminRoles), roomController.createRoom);

// // [GET] All Rooms
// router.get('/list', isAuthenticated, authorizeRoles(Roles.Admin), roomController.getRooms);

// [GET] Rooms Of Theater
router.get('/list-by-theater/:id', roomController.getRoomsByTheater);

// [PUT] Update Room
router.put('/details/:id', isAuthenticated, authorizeRoles(...adminRoles), roomController.updateRoom);

// [DELETE] Delete Room
router.delete('/details/:id', isAuthenticated, authorizeRoles(...adminRoles), roomController.deleteRoom);

// [GET] Room Details
router.get('/details/:id', roomController.getRoomDetails);

export const roomRouter = router;

//! Create Room
/**
 * @swagger
 * /room/create:
 *  post:
 *    tags: [Room]
 *    summary: "[Manager] Tạo phòng chiếu"
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
 *              - type
 *              - name
 *              - capacity
 *            properties:
 *              name:
 *                type: string
 *                default: ""
 *              capacity:
 *                type: number
 *              type:
 *                type: string
 *                description: "2D | 3D"
 *                "enum": [ "2D", "3D"]
 *              seats:
 *                type: array
 *                items:
 *                  type: object
 *                  required:
 *                    - type
 *                    - row
 *                    - col
 *                    - coordinates
 *                  properties:
 *                    type:
 *                      type: string
 *                    row:
 *                      type: string
 *                    col:
 *                      type: number
 *                    coordinates:
 *                      type: array
 *                example:
 *                  - type: "Standard"
 *                    row: "A"
 *                    col: 1
 *                    coordinates: [0,0]
 *                  - type: "Standard"
 *                    row: "A"
 *                    col: 2
 *                    coordinates: [0,1]
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Rooms Of Theater
/**
 * @swagger
 * /room/list-by-theater/{id}:
 *  get:
 *    tags: [Room]
 *    summary: "[All] Lấy danh sách phòng của rạp"
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

//! Lấy thông tin phòng
/**
 * @swagger
 * /room/details/{id}:
 *  get:
 *    tags: [Room]
 *    summary: "[All] Thông tin phòng + DS ghế"
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
 *        description: Room ID
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Update Room
/**
 * @swagger
 * /room/details/{id}:
 *  put:
 *    tags: [Room]
 *    summary: "[Manager] Cập nhật phòng chiếu"
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
 *        description: Theater ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                default: ""
 *              capacity:
 *                type: number
 *              type:
 *                type: string
 *                description: "2D | 3D"
 *                "enum": [ "2D", "3D"]
 *              isActive:
 *                type: boolean
 *                default: true
 *              seats:
 *                type: array
 *                items:
 *                  type: object
 *                  required:
 *                    - type
 *                    - row
 *                    - col
 *                    - coordinates
 *                  properties:
 *                    type:
 *                      type: string
 *                    row:
 *                      type: number
 *                    col:
 *                      type: number
 *                    coordinates:
 *                      type: array
 *                example: []
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Delete Room
/**
 * @swagger
 * /room/details/{id}:
 *  delete:
 *    tags: [Room]
 *    summary: "[Manager] Xóa phòng chiếu"
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
 *        description: Theater ID
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */
