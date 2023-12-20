import express from 'express';

import { isAuthenticated, authorizeRoles } from '../middlewares';
import { movieController } from '../controllers';
import { Roles } from '../constants';

const router = express.Router();
const adminRoles = [Roles.Manager, Roles.Admin];

//! .../api/v1/movie
router.post('/create', isAuthenticated, authorizeRoles(...adminRoles), movieController.createMovie);

router.get('/list', isAuthenticated, authorizeRoles(...adminRoles), movieController.getMovies);
router.get('/now-showing', movieController.getNowShowingMovies);
router.get('/coming-soon', movieController.getComingSoonMovies);
router.get('/sneak-show', movieController.getSneakShowMovies);
router.get('/most-rate', movieController.getMostRateMovies);
// router.get('/most-favorite', movieController.getComingSoonMovies);

router
  .route('/details/:id')
  .put(isAuthenticated, authorizeRoles(...adminRoles), movieController.updateMovie)
  .delete(isAuthenticated, authorizeRoles(...adminRoles), movieController.deleteMovie)
  .get(movieController.getMovieDetails);

export const movieRouter = router;

//! List Movies
/**
 * @swagger
 * /movie/list:
 *  get:
 *    tags: [Movie]
 *    summary: "[Manager] Danh sách phim"
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

//! Now Showing
/**
 * @swagger
 * /movie/now-showing:
 *  get:
 *    tags: [Movie]
 *    summary: "[All] Danh sách phim đang chiếu"
 *    parameters:
 *      - in: query
 *        name: hl
 *        type: string
 *        default: vi
 *        description: Ngôn ngữ trả về 'en | vi'
 *      - in: query
 *        name: genre
 *        type: string
 *        description: Lọc theo thể loại
 *      - in: query
 *        name: sort
 *        type: string
 *        description: Popular (1) | Latest (2)
 *      - in: query
 *        name: page
 *        type: string
 *        description: Trang hiện tại
 *      - in: query
 *        name: limit
 *        type: string
 *        description: Số lượng kết quả mỗi trang
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ListResponse'
 */

//! Coming soon
/**
 * @swagger
 * /movie/coming-soon:
 *  get:
 *    tags: [Movie]
 *    summary: "[All] Danh sách phim sắp chiếu"
 *    parameters:
 *      - in: query
 *        name: hl
 *        type: string
 *        default: vi
 *        description: Ngôn ngữ trả về 'en | vi'
 *      - in: query
 *        name: genre
 *        type: string
 *        description: Lọc theo thể loại
 *      - in: query
 *        name: page
 *        type: string
 *        description: Trang hiện tại
 *      - in: query
 *        name: limit
 *        type: string
 *        description: Số lượng kết quả mỗi trang
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ListResponse'
 */

//! Sneak show
/**
 * @swagger
 * /movie/sneak-show:
 *  get:
 *    tags: [Movie]
 *    summary: "[All] Danh sách phim chiếu sớm"
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
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ListResponse'
 */

//! Most rate
/**
 * @swagger
 * /movie/most-rate:
 *  get:
 *    tags: [Movie]
 *    summary: "[All] Top phim đánh giá cao"
 *    parameters:
 *      - in: query
 *        name: hl
 *        type: string
 *        default: vi
 *        description: Ngôn ngữ trả về 'en | vi'
 *      - in: query
 *        name: movieId
 *        type: string
 *        description: Bỏ qua movie chỉ định (Lấy list đánh giá cao ngoài movie đó)
 *      - in: query
 *        name: top
 *        type: string
 *        description: Số lượng kết quả
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ListResponse'
 */

//! Thêm phim
/**
 * @swagger
 * /movie/create:
 *  post:
 *    tags: [Movie]
 *    summary: "[Manager] Thêm phim"
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
 *              - originalTitle
 *              - overview
 *              - trailer
 *              - poster
 *              - directors
 *              - actors
 *              - languages
 *              - ageType
 *              - formats
 *              - genres
 *            properties:
 *              title:
 *                type: string
 *                example: ""
 *              originalTitle:
 *                type: string
 *                example: ""
 *              overview:
 *                type: object
 *                properties:
 *                  en:
 *                    type: string
 *                    example: ""
 *                  vi:
 *                    type: string
 *                    example: ""
 *              trailer:
 *                description: Đường dẫn tới video trailer
 *                type: string
 *                example: ''
 *              poster:
 *                type: string
 *                default: ""
 *              duration:
 *                type: number
 *              releaseDate:
 *                description: "YYYY-MM-DD"
 *                type: string
 *                format: date
 *                pattern: /([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/
 *              directors:
 *                type: array
 *                description: Tên hoặc objectId
 *                items:
 *                  type: string
 *                example: []
 *              actors:
 *                type: array
 *                items:
 *                  type: string
 *                example: []
 *              languages:
 *                type: array
 *                items:
 *                  type: string
 *                  "enum": [ "Subtitles", "Dubbing"]
 *              ageType:
 *                type: string
 *                description: "P (All) | K | T13 (13+) | T16 (16+) | T18 (18+) | C"
 *                "enum": [ "P", "T13", "T16", "T18"]
 *              formats:
 *                type: array
 *                items:
 *                  type: string
 *                  "enum": [ "2D", "3D"]
 *              genres:
 *                description: Tên hoặc objectId
 *                type: array
 *                items:
 *                  type: string
 *                example: []
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Thông tin phim
/**
 * @swagger
 * /movie/details/{id}:
 *  get:
 *    tags: [Movie]
 *    summary: "[All] Thông tin chi tiết phim"
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
 *        description: Movie ID
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Cập nhật phim
/**
 * @swagger
 * /movie/details/{id}:
 *  put:
 *    tags: [Movie]
 *    summary: "[Manager] Cập nhật phim"
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
 *        description: Movie ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                example: ""
 *              originalTitle:
 *                type: string
 *                example: ""
 *              overview:
 *                type: object
 *                properties:
 *                  en:
 *                    type: string
 *                    example: ""
 *                  vi:
 *                    type: string
 *                    example: ""
 *              trailer:
 *                description: Đường dẫn tới video trailer
 *                type: string
 *                example: ""
 *              poster:
 *                type: string
 *                example: ""
 *              duration:
 *                type: number
 *              releaseDate:
 *                description: "YYYY-MM-DD"
 *                type: string
 *                format: date
 *                pattern: /([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/
 *              directors:
 *                type: array
 *                description: objectId
 *                items:
 *                  type: string
 *                example: []
 *              actors:
 *                type: array
 *                items:
 *                  type: string
 *                example: []
 *              languages:
 *                type: array
 *                items:
 *                  type: string
 *                  "enum": [ "Subtitles", "Dubbing"]
 *              ageType:
 *                type: string
 *                description: "P (All) | K | T13 (13+) | T16 (16+) | T18 (18+) | C"
 *                "enum": [ "P", "T13", "T16", "T18"]
 *              formats:
 *                type: array
 *                items:
 *                  type: string
 *                  "enum": [ "2D", "3D"]
 *              genres:
 *                description: objectId
 *                type: array
 *                items:
 *                  type: string
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

//! Xóa phim
/**
 * @swagger
 * /movie/details/{id}:
 *  delete:
 *    tags: [Movie]
 *    summary: "[Manager] Xóa phim"
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
 *        description: Movie ID
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */
