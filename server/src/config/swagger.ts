import swaggerJsdoc from 'swagger-jsdoc';

import { version } from '../../package.json';

const options: swaggerJsdoc.Options = {
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
    // servers: [
    //   {
    //     url: `http://localhost:${process.env.PORT}/`
    //   }
    // ],
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['**/*.ts']
};

export const swaggerSpec = swaggerJsdoc(options);
