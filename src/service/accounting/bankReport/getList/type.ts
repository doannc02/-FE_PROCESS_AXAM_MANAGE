import { BaseResponse, CommonObject } from '@/service/type'

export interface BankReportGroup {
  bankAccountResponse: {
    id: number
    name: null
  }

  bankReports: BankReportRoot[]
}

export interface BankReportRoot {
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

export type ResBankReport = BaseResponse<BankReportGroup[]>

export type ReqBankReport = {
  start: string
  end: string
  accountLedgerId: number
  bankAccount: CommonObject
  bankAccountId?: number
}
