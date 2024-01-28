"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const appError_1 = require("./appError");
const storage = multer_1.default.diskStorage({
    filename: (_req, file, callback) => {
        callback(null, `${file.fieldname}${Date.now()}`);
    }
});
const fileFilter = (_req, file, callback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        callback(null, true);
    }
    else {
        callback(new appError_1.AppError(400, 'Invalid image file. Image should be of type jpg, jpeg or png'), false);
    }
};
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});
//# sourceMappingURL=multer.js.map