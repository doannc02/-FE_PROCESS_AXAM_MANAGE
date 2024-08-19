import { BaseResponse } from '@/service/type'

export type RequestParams = {
  POST: { accountMoveLine: { id: number }[] }
}

export type Response = {
  POST: BaseResponse<{
    isMatching: boolean
    moneyMatching: number
    partnerId: number | null
    accountMoveLineIds: number[]
  }>
}
