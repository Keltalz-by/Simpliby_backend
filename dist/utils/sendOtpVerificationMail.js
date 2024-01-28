"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtpVerificationMail = void 0;
const helpers_1 = require("./helpers");
const logger_1 = require("./logger");
const mailer_1 = require("./mailer");
async function sendOtpVerificationMail(name, email, otp) {
    try {
        const message = (0, helpers_1.verifyEmailTemplate)(name, otp);
        return await (0, mailer_1.sendMail)(email, 'Email Verification', message);
    }
    catch (err) {
        logger_1.logger.error(err.message);
    }
}
exports.sendOtpVerificationMail = sendOtpVerificationMail;
//# sourceMappingURL=sendOtpVerificationMail.js.map