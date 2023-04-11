import { object, string, type TypeOf } from 'zod';

export const createStoreSchema = object({
  body: object({
    owner: string({
      required_error: 'Owner id is required'
    }),
    businessName: string({
      required_error: 'Business Name is required'
    }),
    location: string({
      required_error: 'Location is required'
    }),
    description: string({
      required_error: 'Location is required'
    }),
    address: string({
      required_error: 'Address is required'
    }),
    city: string({
      required_error: 'City is required'
    }),
    country: string({
      required_error: 'Country is required'
    })
    // images: string({}),
    // logo: string({}),
  })
});

export type CreateStoreInput = TypeOf<typeof createStoreSchema>['body'];
