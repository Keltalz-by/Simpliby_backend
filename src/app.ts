import express from 'express';
import cors from 'cors';
import http from 'http';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { connect, set } from 'mongoose';
import { type Routes } from '@src/common';
import { ErrorHandler } from './middlewares';
import { db, logger, stream } from './utils';
import { NODE_ENV, PORT, ORIGIN, CREDENTIALS } from './config';

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = PORT ?? 5000;
    this.env = NODE_ENV ?? 'development';

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandler();
    this.connectToDatabase();
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/api/v1', route.router);
    });
  }

  public listen() {
    const server = http.createServer(this.app);
    server.listen(this.port, () => {
      logger.info(`==== ENV: ${this.env} ====`);
      logger.info(`App listening on port ${this.port}`);
    });
  }

  public runServer() {
    return this.app;
  }

  private connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }

    void connect(db);
    logger.info('Connected to database');
  }

  private initializeMiddlewares() {
    this.app.use(morgan('dev', { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(helmet());
    this.app.use(hpp());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeSwagger() {
    const options: swaggerJSDoc.Options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Simplibuy REST API',
          version: '1.0.0',
          description: 'This documentation describes the endpoints for Simplibuy ecommerce app.'
        }
      },
      apis: ['swagger.yaml']
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandler() {
    this.app.use(ErrorHandler);
  }
}
