import { BaseResponse } from '@/service/type'

export type TotalDebt = {
  openBalance: {
    debit: number
    credit: number
  }
  arise: {
    debit: number
    credit: number
  }
  endingBalance: {
    debit: number
    credit: number
  }
}

export type Response = {
  GET: BaseResponse<TotalDebt>
}

export type RequestBody = {
  GET: {
    vendorId?: number | null
    start: string
    end: string
  }
}
