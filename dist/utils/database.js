"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = require("mongoose");
const config_1 = require("../config");
const logger_1 = require("./logger");
const db = `${config_1.DATABASE_URL}`;
const connectDB = async () => {
    try {
        (0, mongoose_1.set)('strictQuery', false);
        await (0, mongoose_1.connect)(db);
        logger_1.logger.info('==== Database Connected ====');
        logger_1.logger.info(`============================`);
    }
    catch (err) {
        logger_1.logger.error(err.message);
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=database.js.map