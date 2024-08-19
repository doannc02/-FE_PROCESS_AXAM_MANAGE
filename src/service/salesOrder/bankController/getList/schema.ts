import { z, ZodSchema } from 'zod'
import { Request } from './type'

export const GetInputSchema: ZodSchema<Request['GET']> = z.object({
  name: z.string().optional(),
  bankId: z.number().optional().nullable(),
  activated: z.boolean().optional(),
  page: z.number(),
  size: z.number(),
})

export type GetInput = z.infer<typeof GetInputSchema>
