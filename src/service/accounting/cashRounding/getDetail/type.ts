import { BaseResponse } from '@/service/type'

export type CashRoundingDetail = {
  id: number
  name: string
  roundingPrecision: number
  profitAccountId: number
  lossAccountId: number
  roundingMethod: string
  activated: boolean
}

export type RequestParams = {
  GET: { id: number }
}

export type Response = {
  GET: BaseResponse<CashRoundingDetail>
}
