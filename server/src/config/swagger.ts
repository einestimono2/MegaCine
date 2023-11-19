import path from 'path';
import swaggerJsdoc from 'swagger-jsdoc';

const { version } = require('../../package.json'); //! Chuyển sang import sẽ bị lỗi do set rootDir = src ~ không tìm được file package.json
// import { app } from './env';

const options: swaggerJsdoc.OAS3Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MegaCine API Documentations',
      // description: 'Tất cả API cho hệ thống đặt vé xem phim',
      version
    },
    components: {
      securitySchemes: {
        BearerToken: {
          type: 'http',
          in: 'header',
          name: 'Authorization',
          description: 'Bearer Token',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    servers: [
      // { url: `http://localhost:${app.port}` },
      // { url: process.env.HOST_URL ?? 'https://megacine.japaneast.cloudapp.azure.com' }
    ],
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  //! Sử dụng **/*.ts --> Khi build sang js sẽ không nhận được
  apis: [path.join(__dirname, '../routes/*')]
};

export const swaggerSpec = swaggerJsdoc(options);
