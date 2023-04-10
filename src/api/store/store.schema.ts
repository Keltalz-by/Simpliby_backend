import { object, string, type TypeOf } from 'zod';

export const storeRegisterSchema = object({
  body: object({
    businessName: string({
      required_error: 'Business Name is required'
    }),
    location: string({
      required_error: 'Location is required'
    }),
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

export const storeLoginSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required'
    }).email('Invalid email or password'),
    password: string({
      required_error: 'Password is required'
    })
  })
});

export type StoreRegisterInput = TypeOf<typeof storeRegisterSchema>['body'];
export type StoreLoginInput = TypeOf<typeof storeLoginSchema>['body'];
