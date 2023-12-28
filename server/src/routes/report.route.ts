import express from 'express';

import { isAuthenticated, authorizeRoles } from '../middlewares';
import { Roles } from '../constants';
import { reportController } from '../controllers';

const router = express.Router();
const adminRoles = [Roles.Manager, Roles.Admin];

//! .../api/v1/report

//! [GET] Thống kê booking trong hôm nay và tuần này
router.get('/revenue-overview', isAuthenticated, authorizeRoles(...adminRoles), reportController.getRevenueOverview);

//! 12 tháng - mỗi tháng tổng doanh thu + số lượng booking của tháng đấy (rạp | tất cả) --> chọn năm | năm nay
router.get('/revenue-by-year', isAuthenticated, authorizeRoles(...adminRoles), reportController.getRevenueByYear);

//! [ADMIN] Tổng doanh thu theo từng rạp --> chọn khoảng thời gian
router.get('/revenue-by-theater', isAuthenticated, authorizeRoles(Roles.Admin), reportController.getRevenueByTheater);

//! [MANAGER] Doanh thu theo phim
router.get('/revenue-by-movie', isAuthenticated, authorizeRoles(Roles.Manager), reportController.getRevenueByMovie);

//! [MANAGER] Doanh thu theo mỗi loại dịch vụ (bỏng nước)
router.get(
  '/revenue-by-product',
  isAuthenticated,
  authorizeRoles(Roles.Manager),
  reportController.getRevenueByProduct
);

export const reportRouter = router;

//! Thống kê booking trong hôm nay và tuần này
/**
 * @swagger
 * /report/revenue-overview:
 *  get:
 *    tags: [Report]
 *    summary: "[Manager | Admin] Thống kê số lượng, doanh thu (hôm qua & hôm nay & tuần trước & tuần này)"
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

//! Thống kê booking 12 tháng trong năm
/**
 * @swagger
 * /report/revenue-by-year:
 *  get:
 *    tags: [Report]
 *    summary: "[Manager | Admin] Thống kê số lượng, doanh thu của từng tháng trong năm"
 *    security:
 *      - BearerToken: []
 *    parameters:
 *      - in: query
 *        name: hl
 *        type: string
 *        default: vi
 *        description: Ngôn ngữ trả về 'en | vi'
 *      - in: query
 *        name: year
 *        type: number
 *        description: Năm thống kê (Mặc định là năm hiện tại)
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Thống kê theo rạp
/**
 * @swagger
 * /report/revenue-by-theater:
 *  get:
 *    tags: [Report]
 *    summary: "[Admin] Thống kê số lượng, doanh thu của từng rạp trong một khoảng thời gian"
 *    security:
 *      - BearerToken: []
 *    parameters:
 *      - in: query
 *        name: hl
 *        type: string
 *        default: vi
 *        description: Ngôn ngữ trả về 'en | vi'
 *      - in: query
 *        name: from
 *        type: string
 *        description: Thời gian bắt đầu (YYYY-MM-DD)
 *      - in: query
 *        name: to
 *        type: string
 *        description: Thời gian kết thúc (YYYY-MM-DD)
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Thống kê theo phim
/**
 * @swagger
 * /report/revenue-by-movie:
 *  get:
 *    tags: [Report]
 *    summary: "[Manager] Thống kê số lượng, doanh thu của từng bộ phim được chiếu của rạp trong một khoảng thời gian"
 *    security:
 *      - BearerToken: []
 *    parameters:
 *      - in: query
 *        name: hl
 *        type: string
 *        default: vi
 *        description: Ngôn ngữ trả về 'en | vi'
 *      - in: query
 *        name: from
 *        type: string
 *        description: Thời gian bắt đầu (YYYY-MM-DD)
 *      - in: query
 *        name: to
 *        type: string
 *        description: Thời gian kết thúc (YYYY-MM-DD)
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */

//! Thống kê theo dịch vụ
/**
 * @swagger
 * /report/revenue-by-product:
 *  get:
 *    tags: [Report]
 *    summary: "[Manager] Thống kê số lượng, doanh thu của từng dịch vụ trong một khoảng thời gian"
 *    security:
 *      - BearerToken: []
 *    parameters:
 *      - in: query
 *        name: hl
 *        type: string
 *        default: vi
 *        description: Ngôn ngữ trả về 'en | vi'
 *      - in: query
 *        name: from
 *        type: string
 *        description: Thời gian bắt đầu (YYYY-MM-DD)
 *      - in: query
 *        name: to
 *        type: string
 *        description: Thời gian kết thúc (YYYY-MM-DD)
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 */
