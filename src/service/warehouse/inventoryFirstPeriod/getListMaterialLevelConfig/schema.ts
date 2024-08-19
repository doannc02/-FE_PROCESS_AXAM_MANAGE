import { z, ZodSchema } from 'zod'
import { RequestBody } from './type'

export const GetInputSchema: ZodSchema<RequestBody['GET']> = z.object({
  search: z.string().optional(),
  code: z.string().optional(),
  page: z.number(),
  size: z.number(),
})

export type GetInput = z.infer<typeof GetInputSchema>
