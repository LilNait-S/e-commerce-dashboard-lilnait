import * as z from 'zod'

export const productSchema = z.object({
  name: z.string().min(2, { message: 'Minimum 2 characters' }),
  slug: z
    .string()
    .min(2, { message: 'Minimum 2 characters' })
    .max(50)
    .regex(/^[a-z0-9-]+$/),
  referential_code: z.string().max(20).nonempty({
    message: 'Referential code is required',
  }),
  description: z
    .string()
    .max(2000, { message: 'Maximum 2000 characters' })
    .nonempty({
      message: 'Description is required',
    }),
  images: z.string().array().nonempty({
    message: 'Minimum 1 image',
  }),
  categorys_id: z.string({ required_error: 'Category is required' }),
  // variants_id: z.string(),
})
