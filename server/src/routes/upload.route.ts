import express from 'express';

import { isAuthenticated, authorizeRoles, uploadImage } from '../middlewares';
import { Roles } from '../constants';
import { uploadController } from '../controllers';

const router = express.Router();
const adminRoles = [Roles.Manager, Roles.Admin];

//! .../api/v1/upload
router.post(
  '/image',
  // isAuthenticated,
  // authorizeRoles(...adminRoles),
  uploadImage.single('file'),
  uploadController.uploadImage
);
router.post(
  '/images',
  isAuthenticated,
  authorizeRoles(...adminRoles),
  uploadImage.array('files'),
  uploadController.uploadImages
);

router.delete(
  '/:fileName',
  // isAuthenticated,
  // authorizeRoles(...adminRoles),
  uploadController.deleteImage
);

export const uploadRouter = router;

//! Upload One Image
/**
 * @swagger
 * /api/v1/upload/image:
 *  post:
 *    tags: [Upload]
 *    summary: Tải một ảnh
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
 *              - file
 *            properties:
 *              file:
 *                type: string
 *                format: base64
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Upload Many Image
/**
 * @swagger
 * /api/v1/upload/images:
 *  post:
 *    tags: [Upload]
 *    summary: Tải nhiều ảnh
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
 *              - files
 *            properties:
 *              files:
 *                type: array
 *                items:
 *                  type: string
 *                  format: binary
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Xóa ảnh
/**
 * @swagger
 * /api/v1/upload/{fileName}:
 *  delete:
 *    tags: [Upload]
 *    summary: Xóa ảnh thông qua tên file
 *    security:
 *      - BearerToken: []
 *    parameters:
 *      - in: query
 *        name: hl
 *        type: string
 *        default: vi
 *        description: Ngôn ngữ trả về 'en | vi'
 *      - in: path
 *        name: fileName
 *        type: string
 *        required: true
 *        description: Tên file
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */
