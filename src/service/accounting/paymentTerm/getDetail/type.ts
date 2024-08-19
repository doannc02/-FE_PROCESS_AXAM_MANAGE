import { BaseResponse } from '@/service/type'

type PaymentTermDetail = {
  id: number
  name: string
  hasEarlyDiscount: boolean
  discountAmount: number
  discountComputeType: string
  withinDays: number
  reducedTaxOnDiscount: boolean
  description: string
  currentDate: string
  lines: {
    id: number
    amountDue: number
    computeType: string
    afterDays: number
    anchorDate: string
    paymentTermId: number
  }[]
}

export type RequestParams = {
  GET: { id: number }
}

export type Response = {
  GET: BaseResponse<PaymentTermDetail>
}
