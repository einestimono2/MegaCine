import path from 'path';
import swaggerJsdoc from 'swagger-jsdoc';

import { LIST_API_VERSIONS } from '../constants';
const { version } = require('../../package.json'); //! Chuyển sang import sẽ bị lỗi do set rootDir = src ~ không tìm được file package.json

const options: swaggerJsdoc.OAS3Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MegaCine API Documentations',
      description: 'Danh sách API của hệ thống đặt vé xem phim!',
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
      ...LIST_API_VERSIONS.map((api) => {
        return { url: api };
      })
    ],
    // [
    //   { url: `http://localhost:${app.port}` },
    //   { url: process.env.HOST_URL ?? 'https://megacine.japaneast.cloudapp.azure.com' }
    // ],

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
