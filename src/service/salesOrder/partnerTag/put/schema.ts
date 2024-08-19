import { z, ZodSchema } from 'zod'
import { RequestBody } from './type'

export const PutInputSchema: ZodSchema<RequestBody['PUT']> = z.object({
  id: z.number().optional(),
  code: z
    .string()
    .refine(
      (val) => (val !== '' && !/^[a-zA-Z0-9#_/|.-]/.test(val) ? false : true),
      {
        message: 'Mã bao gồm kí tự chữ, số và -/_',
      }
    )
    .optional(),
  name: z.string().min(1, 'Đây là trường bắt buộc.'),
  description: z.string().optional(),
  activated: z.boolean().optional(),
  isCustomer: z.boolean().optional(),
})

export type PutInput = z.infer<typeof PutInputSchema>
