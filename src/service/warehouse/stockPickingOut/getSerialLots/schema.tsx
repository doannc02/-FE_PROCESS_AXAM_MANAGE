import { z, ZodSchema } from 'zod'
import { RequestBody } from './type'

export const GetInputSchema: ZodSchema<RequestBody['GET']> = z.object({
  code: z.string().optional(),
  manufactureSteps: z.string().optional(),
  warehouseId: z.number().array(),
})

export type GetInput = z.infer<typeof GetInputSchema>
