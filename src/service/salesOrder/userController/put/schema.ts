import { z, ZodSchema } from 'zod'
import { Request } from './type'

export const PutInputSchema: ZodSchema<Request['PUT']> = z.object({
  userId: z.number(),
  attachIds: z.number().array().optional(),
  detachIds: z.number().array().optional(),
})

export type PutInput = z.infer<typeof PutInputSchema>
