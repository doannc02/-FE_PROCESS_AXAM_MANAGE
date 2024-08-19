import { BaseResponse } from '@/service/type'

export interface BankReportTotal {
  openAmount: number
  ariseAmount: number
  finalAmount: number
  arise: {
    debit: number
    credit: number
  }
}

export type ResBankReportTotal = BaseResponse<BankReportTotal>

export type ReqBankReportTotal = {
  start: string
  end: string
  accountLedgerId: number
}
