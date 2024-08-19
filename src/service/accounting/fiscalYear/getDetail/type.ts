import { BaseResponse } from '@/service/type'

type FiscalYearDetail = {
  id: number
  name: string
  startDate: string
  endDate: string
}

export type RequestParams = {
  GET: { id: number }
}

export type Response = {
  GET: BaseResponse<FiscalYearDetail>
}
