import { type Express, type Request, type Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { version } from '../../package.json';
import logger from '../utils';

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

const swaggerSpec = swaggerJsdoc(options);

export function swaggerDocs(app: Express) {
  // Swagger page
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get('/api/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(swaggerSpec);
  });

  logger.info(`Docs available at http://localhost:${process.env.PORT}/api/docs`);
}
