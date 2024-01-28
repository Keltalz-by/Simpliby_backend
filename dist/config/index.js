"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CREDENTIALS = exports.PAYSTACK_INITIALIZE_URL = exports.PAYSTACK_PUBLIC_KEY = exports.PAYSTACK_SECRET_KEY = exports.API_SECRET = exports.API_KEY = exports.CLOUD_NAME = exports.LOCAL_SERVER_URL = exports.SERVER_URL = exports.REDIS_URL = exports.REFRESH_TOKEN_EXPIRESIN = exports.ACCESS_TOKEN_EXPIRESIN = exports.REFRESH_TOKEN_PUBLIC_KEY = exports.REFRESH_TOKEN_PRIVATE_KEY = exports.ACCESS_TOKEN_PUBLIC_KEY = exports.ACCESS_TOKEN_PRIVATE_KEY = exports.SERVICE = exports.EMAIL_PASS = exports.EMAIL_USER = exports.LOG_DIR = exports.LOG_FORMAT = exports.ORIGIN = exports.DATABASE_URL = exports.PORT = exports.NODE_ENV = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
_a = process.env, exports.NODE_ENV = _a.NODE_ENV, exports.PORT = _a.PORT, exports.DATABASE_URL = _a.DATABASE_URL, exports.ORIGIN = _a.ORIGIN, exports.LOG_FORMAT = _a.LOG_FORMAT, exports.LOG_DIR = _a.LOG_DIR, exports.EMAIL_USER = _a.EMAIL_USER, exports.EMAIL_PASS = _a.EMAIL_PASS, exports.SERVICE = _a.SERVICE, exports.ACCESS_TOKEN_PRIVATE_KEY = _a.ACCESS_TOKEN_PRIVATE_KEY, exports.ACCESS_TOKEN_PUBLIC_KEY = _a.ACCESS_TOKEN_PUBLIC_KEY, exports.REFRESH_TOKEN_PRIVATE_KEY = _a.REFRESH_TOKEN_PRIVATE_KEY, exports.REFRESH_TOKEN_PUBLIC_KEY = _a.REFRESH_TOKEN_PUBLIC_KEY, exports.ACCESS_TOKEN_EXPIRESIN = _a.ACCESS_TOKEN_EXPIRESIN, exports.REFRESH_TOKEN_EXPIRESIN = _a.REFRESH_TOKEN_EXPIRESIN, exports.REDIS_URL = _a.REDIS_URL, exports.SERVER_URL = _a.SERVER_URL, exports.LOCAL_SERVER_URL = _a.LOCAL_SERVER_URL, exports.CLOUD_NAME = _a.CLOUD_NAME, exports.API_KEY = _a.API_KEY, exports.API_SECRET = _a.API_SECRET, exports.PAYSTACK_SECRET_KEY = _a.PAYSTACK_SECRET_KEY, exports.PAYSTACK_PUBLIC_KEY = _a.PAYSTACK_PUBLIC_KEY, exports.PAYSTACK_INITIALIZE_URL = _a.PAYSTACK_INITIALIZE_URL;
exports.CREDENTIALS = process.env.CREDENTIALS === 'true';
//# sourceMappingURL=index.js.map