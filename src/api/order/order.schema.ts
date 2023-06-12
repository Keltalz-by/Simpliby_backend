import { object, string, type TypeOf } from 'zod';

export const createOrderSchema = object({
  body: object({
    owner: string({
      required_error: 'User ID is required'
    }),
    cart: string({
      required_error: 'Cart ID is required'
    }),
    paymentMethod: string({
      required_error: 'Payment Method is required'
    }),
    phone: string().optional(),
    deliveryAddress: string().optional(),
    state: string().optional(),
    country: string().optional()
  })
});

export type OrderInput = TypeOf<typeof createOrderSchema>['body'];
