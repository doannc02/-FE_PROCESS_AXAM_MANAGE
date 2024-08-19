import { BaseResponse, CommonObject, PageResponse } from '@/service/type'

export interface OtherDocument {
  id: number
  code: string
  documentType: 'OTHER' | 'SALARY_COST' | 'CORPORATE_INCOME_TAX'
  amount: number
  incomeExpense: CommonObject
  date: string
  accountingDate: string
  isWithInvoice: boolean
  accountLedger: CommonObject
  entryList: EntryList[]
  invoiceTaxes: InvoiceTax[]
}

export interface EntryList {
  label: string
  accountDebit: CommonObject
  accountCredit: CommonObject
  amount: number
  typeDebit: string | null
  typeCredit: string | null
  partnerDebit: CommonObject
  partnerCredit: CommonObject
}

export interface InvoiceTax {
  taxType: string
  amountUntaxed: number
  tax: CommonObject
  numberInvoice: string
  date: string
  taxAmount: number
}

export type ReqGetOtherDocumentList = {
  search?: string
  accountLedgerId: number
  startDate?: string
  endDate?: string
  startAccountingDate?: string
  endAccountingDate?: string
  page: number
  size: number
}

export type ResGetOtherDocumentList = PageResponse<OtherDocument[]>

export type ReqGetOtherDocumentDetail = {
  id: number
}

export type ResGetOtherDocumentDetail = BaseResponse<OtherDocument>
