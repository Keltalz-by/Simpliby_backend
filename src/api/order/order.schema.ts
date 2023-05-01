import { object, string, type TypeOf, number } from 'zod';

export const createOrderSchema = object({
  body: object({
    orderItems: object({
      product: string(),
      quantity: number()
    }).array(),
    phone: string().optional(),
    deliveryAddress: string().optional(),
    state: string().optional(),
    country: string().optional(),
    totalPrice: number().optional()
  })
});

export type OrderInput = TypeOf<typeof createOrderSchema>['body'];
