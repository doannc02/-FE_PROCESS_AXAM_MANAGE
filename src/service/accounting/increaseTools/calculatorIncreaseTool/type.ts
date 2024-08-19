import { BaseResponse } from '@/service/type'

export type calculatorIncreaseTool = {
  recordedValue: number
  periodicAllocation: number
}

export type RequestParams = {
  GET: {
    unitPrice: number
    quantity: number
    numberOfAllocationPeriods: number
  }
}

export type Response = {
  GET: BaseResponse<calculatorIncreaseTool>
}
