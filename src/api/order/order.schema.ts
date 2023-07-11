import { object, string, type TypeOf, number } from 'zod';

export const createOrderSchema = object({
  params: object({
    storeId: string({
      required_error: 'Store ID is required'
    })
  }),
  body: object({
    productId: string({
      required_error: 'Product ID is required'
    }),
    quantity: number({
      required_error: 'Quantity of product is required'
    })
  })
});

export const orderPaymentRequest = object({
  params: object({
    orderId: string({
      required_error: 'Order ID is required'
    })
  })
});

export type OrderInput = TypeOf<typeof createOrderSchema>;
export type OrderPaymentRequestInput = TypeOf<typeof orderPaymentRequest>;
