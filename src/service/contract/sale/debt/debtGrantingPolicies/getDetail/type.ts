import { BaseResponse } from '@/service/type'

type DebtPolicy = {
  id: number
  name: string
  partnerIds: number[]
  partners: string[]
  maximumDebtAmount: number
  currencyId: number
  currency: string
  timeRepayDebt: number
  timeType: string
  approvalDate: string
  paymentTermId: number
  timeApplyPolicy: string
  timeEndPolicy: string
  deferredPaymentPeriod: number
  timeTypeDeferredPaymentPeriod: string
  punish: number
  status: 'DRAFT' | 'PENDING_APPROVAL' | 'UPCOMING' | 'POSTED' | 'ARCHIVED'
  statusPolicy: 'DRAFT' | 'AWAITING' | 'APPROVE' | 'REJECT'
}

export type RequestParams = {
  GET: { id: number }
}

export type Response = {
  GET: BaseResponse<DebtPolicy>
}
