import express from 'express';

import { isAuthenticated, authorizeRoles } from '../middlewares';
import { Roles } from '../constants';
import { fareController } from '../controllers';

const router = express.Router();
const adminRoles = [Roles.Manager, Roles.Admin];

// ....api/v1/fare

// [POST] Add Fare
router.post('/create', isAuthenticated, authorizeRoles(...adminRoles), fareController.createFare);

// [GET] Fare Of Theater
router.get('/theater/:id', fareController.getFareByTheater);

// [PUT] Update Fare
router.put(
  '/details/:id',
  // isAuthenticated,
  // authorizeRoles(...adminRoles),
  fareController.updateFare
);

// [DELETE] Delete Fare
router.delete(
  '/details/:id',
  // isAuthenticated,
  // authorizeRoles(...adminRoles),
  fareController.deleteFare
);

export const fareRouter = router;

//! Thêm mới giá vé
/**
 * @swagger
 * /api/v1/fare/create:
 *  post:
 *    tags: [Fare]
 *    summary: Thêm mới giá vé
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
 *              - normalDay
 *              - weekend
 *              - specialDay
 *              - _2d
 *              - _3d
 *              - u22
 *            properties:
 *              normalDay:
 *                type: string
 *                description: "CN - 0, T2 - 1, T3 - 2 ..."
 *                default: "1,2,3,4"
 *              weekend:
 *                type: string
 *                description: "CN - 0, T2 - 1, T3 - 2 ..."
 *                default: "5,6,0"
 *              specialDay:
 *                type: string
 *                description: "dd/mm (AL - lịch âm)"
 *                default: "14/2,8/3,24/12,1/1,1/1 AL,10/3 AL,1/5,2/9"
 *              description:
 *                type: object
 *                properties:
 *                  en:
 *                    type: string
 *                    example: ''
 *                  vi:
 *                    type: string
 *                    example: ''
 *              u22:
 *                type: number
 *                default: 50000
 *              _2d:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    from:
 *                      type: string
 *                    to:
 *                      type: string
 *                    seat:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          type:
 *                            type: string
 *                          normalDayPrice:
 *                            type: number
 *                          specialDayPrice:
 *                            type: number
 *                example:
 *                  - from: ""
 *                    to: "12:00"
 *                    seat:
 *                      - type: "Standard"
 *                        normalDayPrice: 55000
 *                        specialDayPrice: 70000
 *                      - type: "VIP"
 *                        normalDayPrice: 65000
 *                        specialDayPrice: 80000
 *                      - type: "Sweetbox"
 *                        normalDayPrice: 140000
 *                        specialDayPrice: 170000
 *                  - from: "12:00"
 *                    to: "17:00"
 *                    seat:
 *                      - type: "Standard"
 *                        normalDayPrice: 70000
 *                        specialDayPrice: 80000
 *                      - type: "VIP"
 *                        normalDayPrice: 75000
 *                        specialDayPrice: 85000
 *                      - type: "Sweetbox"
 *                        normalDayPrice: 160000
 *                        specialDayPrice: 180000
 *                  - from: "17:00"
 *                    to: "23:00"
 *                    seat:
 *                      - type: "Standard"
 *                        normalDayPrice: 80000
 *                        specialDayPrice: 90000
 *                      - type: "VIP"
 *                        normalDayPrice: 85000
 *                        specialDayPrice: 95000
 *                      - type: "Sweetbox"
 *                        normalDayPrice: 180000
 *                        specialDayPrice: 200000
 *                  - from: "23:00"
 *                    to: ""
 *                    seat:
 *                      - type: "Standard"
 *                        normalDayPrice: 65000
 *                        specialDayPrice: 75000
 *                      - type: "VIP"
 *                        normalDayPrice: 70000
 *                        specialDayPrice: 80000
 *                      - type: "Sweetbox"
 *                        normalDayPrice: 150000
 *                        specialDayPrice: 170000
 *              _3d:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    from:
 *                      type: string
 *                    to:
 *                      type: string
 *                    seat:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          type:
 *                            type: string
 *                          normalDayPrice:
 *                            type: number
 *                          specialDayPrice:
 *                            type: number
 *                example:
 *                  - from: ""
 *                    to: "12:00"
 *                    seat:
 *                      - type: "Standard"
 *                        normalDayPrice: 60000
 *                        specialDayPrice: 80000
 *                      - type: "VIP"
 *                        normalDayPrice: 80000
 *                        specialDayPrice: 100000
 *                      - type: "Sweetbox"
 *                        normalDayPrice: 160000
 *                        specialDayPrice: 200000
 *                  - from: "12:00"
 *                    to: "17:00"
 *                    seat:
 *                      - type: "Standard"
 *                        normalDayPrice: 80000
 *                        specialDayPrice: 100000
 *                      - type: "VIP"
 *                        normalDayPrice: 90000
 *                        specialDayPrice: 110000
 *                      - type: "Sweetbox"
 *                        normalDayPrice: 180000
 *                        specialDayPrice: 220000
 *                  - from: "17:00"
 *                    to: "23:00"
 *                    seat:
 *                      - type: "Standard"
 *                        normalDayPrice: 100000
 *                        specialDayPrice: 130000
 *                      - type: "VIP"
 *                        normalDayPrice: 110000
 *                        specialDayPrice: 140000
 *                      - type: "Sweetbox"
 *                        normalDayPrice: 220000
 *                        specialDayPrice: 280000
 *                  - from: "23:00"
 *                    to: ""
 *                    seat:
 *                      - type: "Standard"
 *                        normalDayPrice: 100000
 *                        specialDayPrice: 120000
 *                      - type: "VIP"
 *                        normalDayPrice: 110000
 *                        specialDayPrice: 130000
 *                      - type: "Sweetbox"
 *                        normalDayPrice: 220000
 *                        specialDayPrice: 260000
 *              surcharge:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    name:
 *                      type: string
 *                    value:
 *                      type: number
 *                example:
 *                  - name: Sneakshow
 *                    value: 10000
 *                  - name: Blockbuster
 *                    value: 10000
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Cập nhật giá vé
/**
 * @swagger
 * /api/v1/fare/details/{id}:
 *  put:
 *    tags: [Fare]
 *    summary: Cập nhật bảng giá vé
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
 *        description: Fare ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              normalDay:
 *                type: string
 *                description: "CN - 0, T2 - 1, T3 - 2 ..."
 *                default: ""
 *              weekend:
 *                type: string
 *                description: "CN - 0, T2 - 1, T3 - 2 ..."
 *                default: ""
 *              specialDay:
 *                type: string
 *                description: "dd/mm (AL - lịch âm)"
 *                default: ""
 *              description:
 *                type: object
 *                properties:
 *                  en:
 *                    type: string
 *                    example: ''
 *                  vi:
 *                    type: string
 *                    example: ''
 *              u22:
 *                type: number
 *              _2d:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    from:
 *                      type: string
 *                    to:
 *                      type: string
 *                    seat:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          type:
 *                            type: string
 *                          normalDayPrice:
 *                            type: number
 *                          specialDayPrice:
 *                            type: number
 *                example:
 *                  - from: ""
 *                    to: "12:00"
 *                    seat:
 *                      - type: "Standard"
 *                        normalDayPrice: 55000
 *                        specialDayPrice: 70000
 *                      - type: "VIP"
 *                        normalDayPrice: 65000
 *                        specialDayPrice: 80000
 *                      - type: "Sweetbox"
 *                        normalDayPrice: 140000
 *                        specialDayPrice: 170000
 *              _3d:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    from:
 *                      type: string
 *                    to:
 *                      type: string
 *                    seat:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          type:
 *                            type: string
 *                          normalDayPrice:
 *                            type: number
 *                          specialDayPrice:
 *                            type: number
 *                example:
 *                  - from: ""
 *                    to: "12:00"
 *                    seat:
 *                      - type: "Standard"
 *                        normalDayPrice: 60000
 *                        specialDayPrice: 80000
 *                      - type: "VIP"
 *                        normalDayPrice: 80000
 *                        specialDayPrice: 100000
 *                      - type: "Sweetbox"
 *                        normalDayPrice: 160000
 *                        specialDayPrice: 200000
 *              surcharge:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    name:
 *                      type: string
 *                    value:
 *                      type: number
 *                example:
 *                  - name: Sneakshow
 *                    value: 10000
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Lấy bảng giá của rạp
/**
 * @swagger
 * /api/v1/fare/theater/{id}:
 *  get:
 *    tags: [Fare]
 *    summary: Lấy bảng giá của rạp
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

//! Xóa bảng giá
/**
 * @swagger
 * /api/v1/fare/details/{id}:
 *  delete:
 *    tags: [Fare]
 *    summary: Xóa bảng giá
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
 *        description: Fare ID
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */
