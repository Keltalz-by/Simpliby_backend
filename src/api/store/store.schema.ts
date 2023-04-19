import { object, string, type TypeOf } from 'zod';

export const createStoreSchema = object({
  body: object({
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
    }),
    storeImages: object({
      url: string({
        required_error: 'Image url is required'
      }),
      publicId: string({
        required_error: 'Image id is required'
      })
    })
      .array()
      .optional(),
    logo: object({
      url: string({
        required_error: 'Image url is required'
      }),
      publicId: string({
        required_error: 'Image id is required'
      })
    }).optional()
  })
});

export type CreateStoreInput = TypeOf<typeof createStoreSchema>['body'];
