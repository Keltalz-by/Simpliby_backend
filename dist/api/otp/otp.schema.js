"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendOTPSchema = exports.verifySchema = void 0;
const zod_1 = require("zod");
exports.verifySchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        userId: (0, zod_1.string)({
            required_error: 'User ID is required'
        }),
        otp: (0, zod_1.string)({
            required_error: 'OTP is required'
        }).length(4, 'OTP should be four characters')
    })
});
exports.resendOTPSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        userId: (0, zod_1.string)({
            required_error: 'User ID is required'
        }),
        email: (0, zod_1.string)({
            required_error: 'Email is required'
        }).email('Invalid email format')
    })
});
//# sourceMappingURL=otp.schema.js.map