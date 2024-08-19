import { BaseResponse } from '@/service/type'

export type Response = {
  GET: BaseResponse<number>
}

export type RequestBody = {
  GET: {
    numberOfAllocationPeriods: number
    recordedValue: number
  }
}
