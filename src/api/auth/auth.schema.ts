import { object, string, type TypeOf } from 'zod';

export const registerSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }).min(4, 'Name length is too short'),
    email: string({
      required_error: 'Email is required',
    }).email('Invalid email format'),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password length is too short'),
    passwordConfirm: string({
      required_error: 'Password confirm is required',
    }),
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords are not the same',
  }),
});

export const loginSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Invalid email or password'),
    password: string({
      required_error: 'Password is required',
    }),
  }),
});

export type RegisterInput = TypeOf<typeof registerSchema>['body'];
export type LoginInput = TypeOf<typeof loginSchema>['body'];
