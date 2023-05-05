import { number, object, string, type TypeOf } from 'zod';

export const addToCartSchema = object({
  body: object({
    productId: string({
      required_error: 'Product ID is required'
    }),
    quantity: number({
      required_error: 'Product quantity is required'
    })
  })
});

export type AddToCartInput = TypeOf<typeof addToCartSchema>['body'];
