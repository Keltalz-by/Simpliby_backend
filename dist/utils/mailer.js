"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../config");
const logger_1 = require("./logger");
const transporter = nodemailer_1.default.createTransport({
    auth: {
        user: config_1.EMAIL_USER,
        pass: config_1.EMAIL_PASS
    },
    service: config_1.SERVICE
});
async function sendMail(email, subject, message) {
    try {
        const mailOptions = {
            from: `Simpliby ${config_1.EMAIL_USER}`,
            to: email,
            subject,
            html: message
        };
        return await transporter.sendMail(mailOptions);
    }
    catch (err) {
        logger_1.logger.error(err.message);
    }
}
exports.sendMail = sendMail;
//# sourceMappingURL=mailer.js.map