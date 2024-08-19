import { BaseResponse, PageResponse } from '@/service/type'
import { AccountConfig } from '../get/type'

export type RequestParams = {
  GET: { fiscalYearId: number }
}

type AccConfig = {
  id: number
  startFiscalYear: string
  endFiscalYear: string
  isCurrentFiscalYear: boolean
}
export type Response = {
  GET: BaseResponse<AccountConfig>
  LIST: PageResponse<AccConfig[]>
}
