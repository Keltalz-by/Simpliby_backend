import { type TypeOf, object, string } from 'zod';

export const updateProfileSchema = object({
  body: object({
    location: string().optional(),
    phone: string().optional(),
    occupation: string().optional()
  })
});

export type UpdateProfileInput = TypeOf<typeof updateProfileSchema>['body'];
