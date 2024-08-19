import { z, ZodSchema } from 'zod'
import { RequestBody } from './type'

export const DeleteInputSchema: ZodSchema<RequestBody['DELETE']> = z.object({
  id: z.number(),
  userId: z.number()
})

export type DeleteInput = z.infer<typeof DeleteInputSchema>
