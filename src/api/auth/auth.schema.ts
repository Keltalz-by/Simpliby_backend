import { object, string, type TypeOf } from 'zod';

export const registerSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required'
    }).min(4, 'Name length is too short'),
    email: string({
      required_error: 'Email is required'
    }).email('Invalid email format'),
    password: string({
      required_error: 'Password is required'
    }).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, {
      message:
        'Password must be at least eight characters, with at least one upper case letter, one lower case letter, one number and one special character'
    }),
    passwordConfirm: string({
      required_error: 'Password confirm is required'
    })
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords are not the same'
  })
});

export const loginSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required'
    }).email('Invalid email or password'),
    password: string({
      required_error: 'Password is required'
    })
  })
});

export const forgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required'
    }).email('Invalid email')
  })
});

export const resetPasswordSchema = object({
  body: object({
    userId: string({
      required_error: 'User ID is required'
    }),
    password: string({
      required_error: 'Password is required'
    }).min(6, 'Password length must be at least 6 characters'),
    passwordConfirm: string({
      required_error: 'Password confirm is required'
    })
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords are not the same'
  })
});

export type RegisterInput = TypeOf<typeof registerSchema>['body'];
export type LoginInput = TypeOf<typeof loginSchema>['body'];
export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>['body'];
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>['body'];
