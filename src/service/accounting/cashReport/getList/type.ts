import { BaseResponse, CommonObject } from '@/service/type'

export interface CashReportRoot {
  codeAccount: string
  inventoryNumber: number
  reports: CashReport[]
}

export interface Arise {
  debit: number
  credit: number
}

export interface CashReport {
  id: number
  paymentDate: string
  accountingDate: string
  receiptNumber: string
  payNumber: string
  label: string
  account: CommonObject
  reciprocalAccount: CommonObject
  arise: Arise
  inventoryNumber: number
  partner: CommonObject
  type: string
  partnerType: string
}

export type ResCashReport = BaseResponse<CashReportRoot[]>

export type ReqCashReport = {
  search?: string | null
  start: string
  end: string
  accountLedgerId: number
}
