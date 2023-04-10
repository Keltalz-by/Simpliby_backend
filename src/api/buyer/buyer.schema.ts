import { object, string, type TypeOf } from 'zod';

export const registerBuyerSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required'
    }).min(4, 'Name length is too short'),
    email: string({
      required_error: 'Email is required'
    }).email('Invalid email format'),
    password: string({
      required_error: 'Password is required'
    }).min(6, 'Password length is too short'),
    passwordConfirm: string({
      required_error: 'Password confirm is required'
    })
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords are not the same'
  })
});

export type RegisterBuyerInput = TypeOf<typeof registerBuyerSchema>['body'];
