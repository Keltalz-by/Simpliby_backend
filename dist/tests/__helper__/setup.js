"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teardown = exports.clearDb = exports.closeDb = exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
let mongod;
const connect = async () => {
    try {
        mongod = await mongodb_memory_server_1.MongoMemoryServer.create();
        const uri = mongod.getUri();
        await mongoose_1.default.connect(uri);
        console.log('== Test Database Connected ==');
        console.log(`============================`);
    }
    catch (error) {
        console.error(error.message);
    }
};
exports.connect = connect;
const closeDb = async () => {
    await mongoose_1.default.disconnect();
    await mongod.stop();
};
exports.closeDb = closeDb;
const clearDb = async () => {
    await mongoose_1.default.connection.db.dropDatabase();
};
exports.clearDb = clearDb;
const teardown = async (redis) => {
    await new Promise((resolve) => {
        redis.quit();
        redis.on('end', resolve);
    });
};
exports.teardown = teardown;
//# sourceMappingURL=setup.js.map