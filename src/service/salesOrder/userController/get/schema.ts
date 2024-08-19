import { z, ZodSchema } from 'zod'
import { Request } from './type'

export const GetInputSchema: ZodSchema<Request['GET']> = z.object({
    roleId: z.number().nullable()
})

export type GetInput = z.infer<typeof GetInputSchema>
