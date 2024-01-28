"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordResetCompleteTemplate = exports.requestPasswordTemplate = exports.storeVerifiedTemplate = exports.emailVerifiedPasswordTemplate = exports.emailVerifiedTemplate = exports.verifyEmailTemplate = exports.minutesToDate = exports.uploadToCloudinary = exports.makePayment = exports.createOtp = exports.otpGenerator = exports.createToken = exports.accessTokenCookieOptions = void 0;
const otp_generator_1 = __importDefault(require("otp-generator"));
const fs_1 = __importDefault(require("fs"));
const cloudinary_1 = __importDefault(require("./cloudinary"));
const jwt_1 = require("./jwt");
const config_1 = require("../config");
const appError_1 = require("./appError");
const axios_1 = __importDefault(require("axios"));
exports.accessTokenCookieOptions = {
    maxAge: 900000,
    httpOnly: true,
    secure: config_1.NODE_ENV === 'production'
};
const refreshTokenCookieOptions = {
    maxAge: 3.154e10,
    httpOnly: true,
    secure: config_1.NODE_ENV === 'production'
};
const createToken = (res, userId) => {
    const accessToken = (0, jwt_1.signJwt)({ userId }, config_1.ACCESS_TOKEN_PRIVATE_KEY, {
        expiresIn: config_1.ACCESS_TOKEN_EXPIRESIN
    });
    const refreshToken = (0, jwt_1.signJwt)({ userId }, config_1.REFRESH_TOKEN_PRIVATE_KEY, {
        expiresIn: config_1.REFRESH_TOKEN_EXPIRESIN
    });
    res.cookie('accessToken', accessToken, exports.accessTokenCookieOptions);
    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);
    res.cookie('loggedIn', true, exports.accessTokenCookieOptions);
};
exports.createToken = createToken;
function otpGenerator(length, options) {
    return otp_generator_1.default.generate(length, options);
}
exports.otpGenerator = otpGenerator;
const createOtp = () => {
    const newOtp = otpGenerator(4, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false
    });
    return newOtp;
};
exports.createOtp = createOtp;
const makePayment = async (data) => {
    try {
        const url = config_1.PAYSTACK_INITIALIZE_URL;
        const response = await axios_1.default.post(url, data, {
            headers: {
                Authorization: `Bearer ${config_1.PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        return { authorizationUrl: response.data.data.authorization_url, reference: response.data.data.reference };
    }
    catch (error) {
        throw new appError_1.AppError(400, error.response.data.error);
    }
};
exports.makePayment = makePayment;
async function uploadToCloudinary(path, folderName) {
    const images = await cloudinary_1.default.uploader.upload(path, { folder: folderName });
    fs_1.default.unlinkSync(path);
    return { url: images.secure_url, publicId: images.public_id };
}
exports.uploadToCloudinary = uploadToCloudinary;
function minutesToDate(date, minutes) {
    return new Date(date.getTime() + minutes * 60 * 1000);
}
exports.minutesToDate = minutesToDate;
function verifyEmailTemplate(name, otp) {
    return `
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:10px auto;width:90%;padding:5px 0">
                <div style="border-bottom:1px solid #eee">
                    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Simpliby</a>
                </div>
                <p style="font-size:1.1em; font-weight: bold;">Hi, ${name}</p>
                <p>Thank you for choosing Simpliby. Use the OTP to complete your registration. OTP is valid for 20 minutes.</p>
                <h2 style="background: #00466a;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
                <p style="font-size:0.9em;">Regards,<br />Simpliby</p>
            </div>
        </div>
    `;
}
exports.verifyEmailTemplate = verifyEmailTemplate;
function emailVerifiedTemplate(name) {
    return `
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:10px auto;width:90%;padding:5px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Simpliby</a>
        </div>
        <p style="font-size:1.1em; font-weight: bold;">Hi, ${name}</p>
        <p>Your email has been verified successfully. Proceed to login.</p>
        <p>Thank you for choosing Simpliby.</p>
        <p style="font-size:0.9em;">Regards,<br />Simpliby</p>
      </div>
    </div>
  `;
}
exports.emailVerifiedTemplate = emailVerifiedTemplate;
function emailVerifiedPasswordTemplate(name) {
    return `
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:10px auto;width:90%;padding:5px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Simpliby</a>
        </div>
        <p style="font-size:1.1em; font-weight: bold;">Hi, ${name}</p>
        <p>Your email has been verified successfully. Proceed to change your password.</p>
        <p>Thank you for choosing Simpliby.</p>
        <p style="font-size:0.9em;">Regards,<br />Simpliby</p>
      </div>
    </div>
  `;
}
exports.emailVerifiedPasswordTemplate = emailVerifiedPasswordTemplate;
function storeVerifiedTemplate(name) {
    return `
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:10px auto;width:90%;padding:5px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Simpliby</a>
        </div>
        <p style="font-size:1.1em; font-weight: bold;">Thank you for choosing us, ${name}</p>
        <p>Your store has been verified successfully.</p>
        <p style="font-size:0.9em;">Regards,<br />Simpliby</p>
      </div>
    </div>
  `;
}
exports.storeVerifiedTemplate = storeVerifiedTemplate;
function requestPasswordTemplate(name, otp) {
    return `
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:10px auto;width:90%;padding:5px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Simpliby</a>
        </div>
        <p style="font-size:1.1em; font-weight: bold;">Hi, ${name}</p>
        <p>Thank you for choosing Simpliby. Enter the OTP to reset your password. OTP is valid for 20 minutes.</p>
        <h2 style="background: #00466a;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
        <p style="font-size:0.9em;">Regards,<br />Simpliby</p>
      </div>
    </div>
  `;
}
exports.requestPasswordTemplate = requestPasswordTemplate;
function passwordResetCompleteTemplate(name) {
    return `
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:10px auto;width:90%;padding:5px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Simpliby</a>
        </div>
        <p style="font-size:1.1em; font-weight: bold;">Hi, ${name}</p>
        <p>Your password has been reset successfully. Proceed to login with your new password.</p>
        <p>Thank you for choosing Simpliby.</p>
        <p style="font-size:0.9em;">Regards,<br />Simpliby</p>
      </div>
    </div>
  `;
}
exports.passwordResetCompleteTemplate = passwordResetCompleteTemplate;
//# sourceMappingURL=helpers.js.map