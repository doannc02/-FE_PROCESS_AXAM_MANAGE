import { z, ZodSchema } from 'zod'
import { RequestBody } from './type'

export const PutInputSchema: ZodSchema<RequestBody['PUT']> = z.object({
  id: z.number(),
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
  bankBranches: z
    .object({
      id: z.number().optional(),
      code: z
        .string()
        .refine(
          (val) =>
            val !== '' && !/^[a-zA-Z0-9#_/|.-]/.test(val) ? false : true,
          {
            message: 'Mã bao gồm kí tự chữ, số và -/_',
          }
        )
        .optional(),
      name: z.string().optional(),
    })
    .array()
    .optional(),
  deleteBankBranches: z.number().array().optional(),
})

export type PutInput = z.infer<typeof PutInputSchema>
