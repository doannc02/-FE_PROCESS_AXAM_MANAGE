import { z, ZodSchema } from 'zod'
import { RequestBody } from './type'

export const BulkDeleteInputSchema: ZodSchema<RequestBody['BULK_DELETE']> =
  z.object({
    deletedUserIds: z.array(z.number()),
    reason: z.string(),
    deletedType: z.string(),
    companyId: z.number().nullable().optional(),
    branchId: z.number().nullable().optional(),
    reasonDelete: z.string().nullable(),
  })

export type BulkDeleteInput = z.infer<typeof BulkDeleteInputSchema>
