import { BaseResponse } from '@/service/type'

export type RequestParams = {
  GET: { accountMoveId: number; dayPayment: string }
}

export type Response = {
  GET: BaseResponse<{
    moneyPaid: number
    haveEarlyDiscount: string | null
    currencyId: number
    dayPayment: string
  }>
}
