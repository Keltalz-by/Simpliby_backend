"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const hpp_1 = __importDefault(require("hpp"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
// import { type Routes } from './common';
const middlewares_1 = require("./middlewares");
const utils_1 = require("./utils");
const config_1 = require("./config");
const mongoose_1 = require("mongoose");
// const allowedOrigins = ORIGIN?.split(',').map((url) => url.trim());
class App {
    constructor(routes) {
        this.app = (0, express_1.default)();
        this.port = config_1.PORT !== null && config_1.PORT !== void 0 ? config_1.PORT : 5000;
        this.env = config_1.NODE_ENV !== null && config_1.NODE_ENV !== void 0 ? config_1.NODE_ENV : 'development';
        this.app.disable('x-powered-by');
        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeSwagger();
        this.initializeErrorHandler();
    }
    listen() {
        const server = http_1.default.createServer(this.app);
        server.listen(this.port, () => {
            utils_1.logger.info(`============================`);
            utils_1.logger.info(`===== ENV: ${this.env} =====`);
            utils_1.logger.info(`App listening on port ${this.port}`);
            utils_1.logger.info(`============================`);
        });
    }
    runServer() {
        return this.app;
    }
    connectToDatabase() {
        if (this.env !== 'production') {
            (0, mongoose_1.set)('debug', true);
        }
        void (0, utils_1.connectDB)();
    }
    initializeMiddlewares() {
        this.app.use((0, morgan_1.default)('dev', { stream: utils_1.stream }));
        this.app.use((0, cors_1.default)({ origin: 'http://localhost:5173', credentials: config_1.CREDENTIALS }));
        this.app.use((0, helmet_1.default)());
        this.app.use((0, hpp_1.default)());
        this.app.use((0, compression_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use(middlewares_1.limiter);
        this.app.use((0, express_mongo_sanitize_1.default)());
    }
    initializeRoutes(routes) {
        routes.forEach((route) => {
            this.app.use('/api/v1', route);
        });
    }
    initializeSwagger() {
        const options = {
            definition: {
                openapi: '3.0.0',
                info: {
                    title: 'Simplibuy REST API',
                    version: '1.0.0',
                    description: 'This documentation describes the endpoints for Simplibuy ecommerce app.'
                },
                servers: [
                    {
                        url: config_1.SERVER_URL
                    }
                ]
            },
            apis: ['swagger.yaml']
        };
        const specs = (0, swagger_jsdoc_1.default)(options);
        this.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
    }
    initializeErrorHandler() {
        this.app.use(middlewares_1.NotFoundError);
        this.app.use(middlewares_1.ErrorHandler);
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map