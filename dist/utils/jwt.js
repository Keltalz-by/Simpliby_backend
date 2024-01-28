"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = require("./logger");
function signJwt(payload, key, options = {}) {
    const privateKey = Buffer.from(key, 'base64').toString('ascii');
    return jsonwebtoken_1.default.sign(payload, privateKey, Object.assign(Object.assign({}, (Boolean(options) && options)), { algorithm: 'RS256' }));
}
exports.signJwt = signJwt;
const verifyJwt = (token, key) => {
    try {
        const publicKey = Buffer.from(key, 'base64').toString('ascii');
        return jsonwebtoken_1.default.verify(token, publicKey);
    }
    catch (err) {
        logger_1.logger.error(err.message);
        return null;
    }
};
exports.verifyJwt = verifyJwt;
//# sourceMappingURL=jwt.js.map