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
import mongoSanitize from 'express-mongo-sanitize';
import { type Routes } from './common';
import { ErrorHandler, NotFoundError, limiter } from './middlewares';
import { connectDB, logger, stream } from './utils';
import { NODE_ENV, PORT, SERVER_URL, ORIGIN, CREDENTIALS } from './config';
import { set } from 'mongoose';

const allowedOrigins = ORIGIN?.split(',').map((url) => url.trim());

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = PORT ?? 5000;
    this.env = NODE_ENV ?? 'development';

    this.app.disable('x-powered-by');

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandler();
  }

  public listen() {
    const server = http.createServer(this.app);
    server.listen(this.port, () => {
      logger.info(`============================`);
      logger.info(`===== ENV: ${this.env} =====`);
      logger.info(`App listening on port ${this.port}`);
      logger.info(`============================`);
    });
  }

  public runServer() {
    return this.app;
  }

  private connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }
    void connectDB();
  }

  private initializeMiddlewares() {
    this.app.use(morgan('dev', { stream }));
    this.app.use(cors({ origin: allowedOrigins, credentials: CREDENTIALS }));
    this.app.use(helmet());
    this.app.use(hpp());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(limiter);
    this.app.use(mongoSanitize());
  }

  private initializeRoutes(routes: Routes[]) {
    for (const route of routes) {
      this.app.use('/api/v1', route.router);
    }
  }

  private initializeSwagger() {
    const options: swaggerJSDoc.Options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Simplibuy REST API',
          version: '1.0.0',
          description: 'This documentation describes the endpoints for Simplibuy ecommerce app.'
        },
        servers: [
          {
            url: SERVER_URL
          }
        ]
      },
      apis: ['swagger.yaml']
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandler() {
    this.app.use(NotFoundError);
    this.app.use(ErrorHandler);
  }
}
