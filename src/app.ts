import express from 'express';
import cors from 'cors';
import http from 'http';
import helmet from 'helmet';
import config from 'config';
import morgan from 'morgan';
import compression from 'compression';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { type Routes } from '@src/common';
import { ErrorHandler } from '@src/middlewares';
import { logger } from '@src/utils';

const logFormat = config.get<string>('logFormat');

const origin = config.get<string>('origin');
const credentials = config.get<boolean>('credentials');

const port = config.get<number>('port');
const nodeEnv = config.get<string>('nodeEnv');

export default class App {
  public app: express.Application;
  public port: number;
  public nodeEnv: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = port;
    this.nodeEnv = nodeEnv;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandler();
  }

  private initializeMiddlewares() {
    this.app.use(morgan(logFormat));
    this.app.use(cors({ origin, credentials }));
    this.app.use(helmet());
    this.app.use(hpp());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/api/v1', route.router);
    });
  }

  private initializeSwagger() {
    const options: swaggerJSDoc.Options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Simplibuy REST API',
          version: '1.0.0',
          description: 'This documentation describes the endpoints for Simplibuy ecommerce app.',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandler() {
    this.app.use(ErrorHandler);
  }

  public listen() {
    const server = http.createServer(this.app);
    server.listen(this.port, () => {
      logger.info(`==== ENV: ${this.nodeEnv} ====`);
      logger.info(`App listening on port ${this.port}`);
    });
  }

  public runServer() {
    return this.app;
  }
}
