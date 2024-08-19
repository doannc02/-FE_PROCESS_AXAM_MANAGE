import { PageResponse } from '@/service/type'

export type DebtPolicyApprove = {
  id: number
  name: string
  timeRepayDebt: number
  timeType: string
  approvalDate: string
  approvalId: number
  approvalPerson: string
  timeApplyPolicy: string
  timeEndPolicy: string
  statusPolicy: string
}

export type Response = {
  GET: PageResponse<DebtPolicyApprove[]>
}

export type RequestBody = {
  GET: {
    timeApplyPolicy?: string | null
    timeEndPolicy?: string | null
    statuses: string[]
    page: number
    size: number
  }
}
