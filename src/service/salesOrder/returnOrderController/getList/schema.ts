import { z, ZodSchema } from 'zod'
import { Request } from './type'

export const GetInputSchema: ZodSchema<Request['GET']> = z.object({
  search: z.string().optional(),
  dateTime: z.string().optional(),
  state: z.string().optional(),
  page: z.number(),
  size: z.number(),
})

export type GetInput = z.infer<typeof GetInputSchema>
