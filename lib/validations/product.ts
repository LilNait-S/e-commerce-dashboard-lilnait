import * as z from 'zod'

const variableSchema = z.object({
  id: z.string().optional(),
  in_stock: z.boolean(),
  sizes_id: z.string().nonempty({
    message: 'Description is required',
  }),
  price_size: z.coerce.number().min(1, 'A price greater than 0 is required'),
  available_quantity: z.coerce.number().optional(),
  price_offer: z.coerce.number().optional(),
})

export const productSchema = z.object({
  name: z.string().min(2, { message: 'Minimum 2 characters' }),
  slug: z
    .string()
    .min(2, { message: 'Minimum 2 characters' })
    .max(60)
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
  images: z.array(z.any()).refine((images) => images.length >= 1, {
    message: 'At least one image is required',
  }),
  // images: z
  //   .array(z.custom<File>())
  //   .refine((images) => images.length >= 1, {
  //     message: 'At least one image is required',
  //   })
  //   .refine(
  //     (files) => files?.[0]?.size <= MAX_FILE_SIZE,
  //     `Max file size is 5MB.`
  //   )
  //   .refine(
  //     (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //     '.jpg, .jpeg, .png and .webp files are accepted.'
  //   ),

  categorys_id: z.string({ required_error: 'Category is required' }),
  variants: z.array(variableSchema),
})
