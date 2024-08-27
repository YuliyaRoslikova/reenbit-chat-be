import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import rootRouter from './routers/index.js';
import cookieParser from 'cookie-parser';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
import { TEMP_UPLOAD_DIR } from './constants/index.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(
    express.json({
      limit: '1mb',
      type: ['application/json', 'application/vnd.api+json'],
    }),
  );

  app.use(cors());
  app.use(cookieParser());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use('/uploads', express.static(TEMP_UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());

  app.use(rootRouter);

  app.use(errorHandler);

  app.use('*', notFoundHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
};
