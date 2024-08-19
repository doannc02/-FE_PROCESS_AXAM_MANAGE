import { BaseResponse } from '@/service/type'

export type RequestParam = {
  PUT: {
    id: number
    status?: string //DRAFT, PENDING_APPROVAL, UPCOMING, EFFECTIVE, ARCHIVED
    statusPolicy?: string //DRAFT, AWAITING, APPROVE, REJECT
  }
}

export type Response = {
  PUT: BaseResponse<{
    id: number | null
    policies: string[]
    partners: string[]
    policyIds: [0]
  }>
}
