import { BaseResponse } from '@/service/type'

export interface CashReportTotal {
  openAmount: number
  ariseAmount: number
  finalAmount: number
  arise: {
    debit: number
    credit: number
  }
}

export type ResCashReportTotal = BaseResponse<CashReportTotal>

export type ReqCashReportTotal = {
  start: string
  end: string
  accountLedgerId: number
}
