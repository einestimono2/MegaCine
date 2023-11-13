import express from 'express';

import { isAuthenticated, authorizeRoles, uploadImage } from '../middlewares';
import { movieController } from '../controllers';
import { Roles } from '../constants';

const router = express.Router();
const adminRoles = [Roles.Manager, Roles.Admin];

//! .../api/v1/movie
router.post(
  '/create',
  isAuthenticated,
  authorizeRoles(...adminRoles),
  uploadImage.single('poster'),
  movieController.createMovie
);
router.get('/list', isAuthenticated, movieController.getMovies);

router
  .route('/details/:id')
  .put(isAuthenticated, authorizeRoles(...adminRoles), uploadImage.single('poster'), movieController.updateMovie)
  .delete(isAuthenticated, authorizeRoles(...adminRoles), movieController.deleteMovie)
  .get(isAuthenticated, movieController.getMovie);

export const movieRouter = router;

//! Thêm phim
/**
 * @swagger
 * /api/v1/movie/create:
 *  post:
 *    tags: [Movie]
 *    summary: Thêm phim
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
 *              - title
 *              - originalTitle
 *              - overview
 *              - trailer
 *              - poster
 *              - directors
 *              - actors
 *              - language
 *              - ageType
 *              - type
 *              - genres
 *            properties:
 *              title:
 *                type: string
 *                example: "NĂM ĐÊM KINH HOÀNG"
 *              originalTitle:
 *                type: string
 *                example: "FIVE NIGHTS AT FREDDY'S"
 *              overview:
 *                type: object
 *                properties:
 *                  en:
 *                    type: string
 *                    example: "A troubled security guard begins working at Freddy Fazbear's Pizza. During his first night on the job, he realizes that the night shift won't be so easy to get through. Pretty soon he will unveil what actually happened at Freddy's."
 *                  vi:
 *                    type: string
 *                    example: "Nhân viên bảo vệ Mike bắt đầu làm việc tại Freddy Fazbear's Pizza. Trong đêm làm việc đầu tiên, anh nhận ra mình sẽ không dễ gì vượt qua được ca đêm ở đây. Chẳng mấy chốc, anh sẽ vén màn sự thật đã xảy ra tại Freddy's."
 *              trailer:
 *                description: Đường dẫn tới video trailer
 *                type: string
 *                example: 'https://www.youtube.com/watch?v=J7XVzwEdUNw&embeds_referring_euri=https%3A%2F%2Fwww.cgv.vn%2F&source_ve_path=Mjg2NjY&feature=emb_logo'
 *              poster:
 *                type: string
 *                format: base64
 *              duration:
 *                type: number
 *                example: 105
 *              releaseDate:
 *                description: "YYYY-MM-DD"
 *                type: string
 *                format: date
 *                pattern: /([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/
 *                example: "2023/10/27"
 *              directors:
 *                type: array
 *                description: Tên hoặc objectId
 *                items:
 *                  type: string
 *                example: [Matthew Lillard, Josh Hutcherson, Mary Stuart Masterson]
 *              actors:
 *                type: array
 *                items:
 *                  type: string
 *                example: [Emma Tammi]
 *              language:
 *                type: object
 *                properties:
 *                  en:
 *                    type: string
 *                    example: 'English with Vietnamese subtitle'
 *                  vi:
 *                    type: string
 *                    example: 'Tiếng Anh - Phụ đề Tiếng Việt'
 *              ageType:
 *                type: string
 *                description: "P (All) | K | T13 (13+) | T16 (16+) | T18 (18+) | C"
 *                "enum": [ "P", "T13", "T16", "T18"]
 *              type:
 *                type: string
 *                description: "2D | 3D"
 *                "enum": [ "2D", "3D"]
 *              genres:
 *                description: Tên hoặc objectId
 *                type: array
 *                items:
 *                  type: string
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! List Movies
/**
 * @swagger
 * /api/v1/movie/list:
 *  get:
 *    tags: [Movie]
 *    summary: Lấy danh sách phim
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

//! Thông tin phim
/**
 * @swagger
 * /api/v1/movie/details/{id}:
 *  get:
 *    tags: [Movie]
 *    summary: Thông tin chi tiết phim
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

//! Cập nhật phim
/**
 * @swagger
 * /api/v1/movie/details/{id}:
 *  put:
 *    tags: [Movie]
 *    summary: Cập nhật phim
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
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              originalTitle:
 *                type: string
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
 *              poster:
 *                type: string
 *                format: base64
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
 *              actors:
 *                type: array
 *                items:
 *                  type: string
 *              language:
 *                type: object
 *                properties:
 *                  en:
 *                    type: string
 *                    example: ""
 *                  vi:
 *                    type: string
 *                    example: ""
 *              ageType:
 *                type: string
 *                description: "P (All) | K | T13 (13+) | T16 (16+) | T18 (18+) | C"
 *                "enum": [ "P", "T13", "T16", "T18"]
 *              type:
 *                type: string
 *                description: "2D | 3D"
 *                "enum": [ "2D", "3D"]
 *              genres:
 *                description: objectId
 *                type: array
 *                items:
 *                  type: string
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
 * /api/v1/movie/details/{id}:
 *  delete:
 *    tags: [Movie]
 *    summary: Xóa phim
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
