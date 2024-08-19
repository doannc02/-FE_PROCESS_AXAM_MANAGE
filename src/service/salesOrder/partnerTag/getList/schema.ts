import { z, ZodSchema } from 'zod'
import { Request } from './type'

export const GetInputSchema: ZodSchema<Request['GET']> = z.object({
  isCustomer: z.boolean(),
  name: z.string().optional(),
  partnerId: z.number().optional().nullable(),
  page: z.number(),
  size: z.number(),
})

export type GetInput = z.infer<typeof GetInputSchema>
