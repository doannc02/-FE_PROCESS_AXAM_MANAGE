import { z, ZodSchema } from 'zod'
import { RequestBody } from './type'

export const GetInputSchema: ZodSchema<RequestBody['GET']> = z.object({
  search: z.string().optional().nullable(),
  sourceProductType: z.string().optional().nullable(),
  sourceDocument: z.string().nullable().optional(),
  warehouseId: z.number().optional().nullable(),
  state: z.string().optional().nullable(),
  page: z.number(),
  size: z.number(),
})

export type GetInput = z.infer<typeof GetInputSchema>
