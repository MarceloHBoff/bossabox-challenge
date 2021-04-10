import 'reflect-metadata';

import { errors } from 'celebrate';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';

import 'express-async-errors';

import swaggerDocument from '../swagger.json';

import createConnection from './database';
import AppError from './errors/AppError';
import routes from './routes';

createConnection();

const app = express();

const swaggerOptions = {
  customCss: '.swagger-ui .topbar { display: none }',
};

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, swaggerOptions),
);

app.use(cors());

app.use(express.json());

app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export default app;
