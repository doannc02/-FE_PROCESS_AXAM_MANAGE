import { z, ZodSchema } from 'zod'
import { RequestBody } from './type'

export const PutInputSchema: ZodSchema<RequestBody['PUT']> = z.object({
  companyId: z.number(),
  data: z.array(
    z.object({
      id: z.number().optional().nullable(),
      color: z.string(),
      font: z.string(),
      size: z.number(),
      type: z.string(),
    })
  ),
})

export type PutInput = z.infer<typeof PutInputSchema>
