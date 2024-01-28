"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'Name is required'
        }).min(4, 'Name length is too short'),
        email: (0, zod_1.string)({
            required_error: 'Email is required'
        }).email('Invalid email format'),
        password: (0, zod_1.string)({
            required_error: 'Password is required'
        }).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, {
            message: 'Password must be at least eight characters, with at least one upper case letter, one lower case letter, one number and one special character'
        }),
        passwordConfirm: (0, zod_1.string)({
            required_error: 'Password confirm is required'
        })
    }).refine((data) => data.password === data.passwordConfirm, {
        path: ['passwordConfirm'],
        message: 'Passwords are not the same'
    })
});
exports.loginSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: 'Email is required'
        }).email('Invalid email or password'),
        password: (0, zod_1.string)({
            required_error: 'Password is required'
        })
    })
});
exports.forgotPasswordSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: 'Email is required'
        }).email('Invalid email')
    })
});
exports.resetPasswordSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        userId: (0, zod_1.string)({
            required_error: 'User ID is required'
        }),
        password: (0, zod_1.string)({
            required_error: 'Password is required'
        }).min(6, 'Password length must be at least 6 characters'),
        passwordConfirm: (0, zod_1.string)({
            required_error: 'Password confirm is required'
        })
    }).refine((data) => data.password === data.passwordConfirm, {
        path: ['passwordConfirm'],
        message: 'Passwords are not the same'
    })
});
//# sourceMappingURL=auth.schema.js.map