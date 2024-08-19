import { BaseResponse } from '@/service/type'

export type AccountOverPayment = {
  accountPaymentId: number
  accountPaymentCode: string
  amount: number
  accountMoveLineId: number
  currencyId: number
  currency: string
  paymentAccountId: number
  paymentLabel: string
  payType: string
}

export type RequestParams = {
  GET: { partnerId: number; accountMoveType: string }
}

export type Response = {
  GET: BaseResponse<AccountOverPayment[]>
}
