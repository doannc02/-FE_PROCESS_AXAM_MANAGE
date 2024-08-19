import { z, ZodSchema } from 'zod'
import { RequestBody } from './type'

export const PostInputSchema: ZodSchema<RequestBody['POST']> = z.object({
  saleUserRoleId: z.number({
    required_error: 'Đây là trường bắt buộc.',
    invalid_type_error: 'Đây là trường bắt buộc.',
  }),
  saleManagerRoleId: z.number({
    required_error: 'Đây là trường bắt buộc.',
    invalid_type_error: 'Đây là trường bắt buộc.',
  }),
  defaultWarehouseId: z.number({
    required_error: 'Đây là trường bắt buộc.',
    invalid_type_error: 'Đây là trường bắt buộc.',
  }),
  isMultipleWarehouse: z.boolean(),
})

export type PostInput = z.infer<typeof PostInputSchema>
