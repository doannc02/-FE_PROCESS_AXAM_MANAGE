import { z, ZodSchema } from 'zod'
import { RequestBody } from './type'

export const PutInputSchema: ZodSchema<RequestBody['PUT']> = z.object({
  companyId: z.number(),
  data: z.object({
    id: z.number().optional().nullable(),
    layout: z.string(),
    theme: z.string(),
    firstMainColor: z.string(),
    secondMainColor: z.string(),
    thirdMainColor: z.string(),
    fourthMainColor: z.string(),
    successColor: z.string(),
    errorColor: z.string(),
    warningColor: z.string(),
  }),
})

export type PutInput = z.infer<typeof PutInputSchema>
