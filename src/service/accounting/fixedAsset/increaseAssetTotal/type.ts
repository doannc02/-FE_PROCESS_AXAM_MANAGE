import { BaseResponse } from '@/service/type'

export type increaseAssetTotal = {
  recordedValue: number
  remainAmount: number
  periodicAllocation: number
}


export type Response = {
  GET: BaseResponse<increaseAssetTotal>
}
