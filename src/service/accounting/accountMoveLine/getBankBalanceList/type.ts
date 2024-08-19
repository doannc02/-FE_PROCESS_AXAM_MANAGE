import { CommonObject, PageResponse } from '@/service/type'

export type AccountBalance = {
  account: {
    id: number
    code: string
    name: string
  }
  partner: {
    id: number
    name: string
    code: string
  }
  bankAccount: {
    bank: string
    accountNumber: string
    bankName: string
  }
  debit: number
  credit: number
  amountSourceDebit: number
  amountSourceCredit: number
}

export type Response = {
  GET: PageResponse<AccountBalance[]>
}

export type RequestBody = {
  GET: {
    search?: string
    searchBankAccount?: string
    account: {
      id: number
      name: string
    }
    currency: {
      id: number
      name: string
    }
    type?: string
    page: number
    size: number
    beginType: 'CUSTOMER' | 'VENDOR' | 'BANK'
    partner?: CommonObject | null
  }
}
