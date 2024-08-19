import { z, ZodSchema } from 'zod'
import { RequestBody } from './type'

export const PutInputSchema: ZodSchema<RequestBody['PUT']> = z.object({
  companyId: z.number(),
  data: z.array(
    z.object({
      id: z.number().optional().nullable(),
      type: z.string(),
      textColor: z.string(),
      hoverTextColor: z.string(),
      backgroundColor: z.string(),
      backgroundHoverColor: z.string(),
      borderColor: z.string(),
      borderHoverColor: z.string(),
    })
  ),
})

export type PutInput = z.infer<typeof PutInputSchema>
