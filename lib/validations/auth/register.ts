import * as z from 'zod'

export const registerUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
})
