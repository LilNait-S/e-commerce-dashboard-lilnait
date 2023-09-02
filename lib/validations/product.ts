import * as z from 'zod'

export const ProductValidation = z.object({
  name: z.string().min(2, { message: 'minimum 2 characters' }),
  referential_code: z.ostring(),
  price: z.number(),
  description: z.string().max(2000, { message: 'maximum 2000 characters'}),
  image_url: z.string().url().nonempty()
})
