import * as z from 'zod'

export const ProductValidation = z.object({
  name: z.string().min(2, { message: 'minimum 2 characters' }),
  referential_code: z.string(),
  price: z.coerce.number().min(0),
  description: z.string().max(2000, { message: 'maximum 2000 characters' }),
})
