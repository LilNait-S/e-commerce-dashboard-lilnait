import * as z from 'zod'

export const productSchema = z.object({
  name: z.string().min(2, { message: 'Minimum 2 characters' }),
  slug: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-z0-9-]+$/),
  referential_code: z
    .string()
    .min(2, { message: 'Minimum 2 characters' })
    .max(20)
    .optional(),
  description: z.string().max(2000, { message: 'Maximum 2000 characters' }),
  media: z.union([z.string(), z.array(z.string())]),
  categorys_id: z.union([z.number(), z.undefined()]).optional(),
  tags_id: z
    .union([z.number(), z.array(z.number()), z.undefined()])
    .default([])
    .optional(),
  // inventory_id: z.array(z.string()),
})
