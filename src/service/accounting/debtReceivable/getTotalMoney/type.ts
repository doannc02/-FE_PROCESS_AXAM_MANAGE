import { BaseResponse } from '@/service/type'

export type Response = {
  GET: BaseResponse<{
    moneyDebt: number
    numberPartner: number
  }>
}

export type RequestBody = {
  GET: {
    paymentType: 'INBOUND' | 'OUTBOUND'
  }
}
