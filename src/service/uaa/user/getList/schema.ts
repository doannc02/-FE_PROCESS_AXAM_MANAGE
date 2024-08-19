import { z, ZodSchema } from 'zod'
import { RequestBody } from './type'

export const GetInputSchema: ZodSchema<RequestBody['GET']> = z.object({
  fullName: z.string().optional().nullable(),
  email: z.number().optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
  page: z.number(),
  size: z.number(),
})

export type GetInput = z.infer<typeof GetInputSchema>
