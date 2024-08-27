import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import contactsRouter from './routers/contacts.js';
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';

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

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(contactsRouter);

  app.use(errorHandler);

  app.use('*', notFoundHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
};
