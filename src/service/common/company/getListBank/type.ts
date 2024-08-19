import { PageResponse } from '@/service/type'

export type AccountingJournal = {
  id: number
  code: string
  name: string
  type: string
  defaultAccount: string
  currency: string
  bank: string
  accountNumber: string
}

export type Response = {
  GET: PageResponse<AccountingJournal[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
    type?: 'SALE' | 'PURCHASE' | 'CASH' | 'BANK' | 'GENERAL'
    defaultAccountId?: number | null
  }
}
