import * as z from 'zod'

export const identifyUserSchema = z.object({
  email: z.string().email(),
})
