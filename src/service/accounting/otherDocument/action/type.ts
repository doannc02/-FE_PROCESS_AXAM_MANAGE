import { CommonObject } from '@/service/type'

export interface ReqSaveOtherDocument {
  id: number
  code: string
  documentType: string
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
