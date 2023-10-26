import * as z from 'zod'

export const productSchema = z.object({
  name: z.string().min(2, { message: 'Minimum 2 characters' }),
  slug: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-z0-9-]+$/),
  referential_code: z.string().max(20).optional(),
  description: z.string().max(2000, { message: 'Maximum 2000 characters' }),
  images: z.string().array().nonempty({
    message: "Minimum 1 image",
  }),
  // categorys_id: z.number(),
  // tags_id: z
  //   .union([z.number(), z.array(z.number()), z.undefined()])
  //   .default([])
  //   .optional(),
  // variants_id: z.string(),
})
