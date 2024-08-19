import { PageResponse } from '@/service/type'

export type AccountingJournal = {
  id: number
  code: string
  name: string
  type: string
  defaultAccount: string
  currency: string
}

export type Response = {
  GET: PageResponse<AccountingJournal[]>
}

export type RequestBody = {
  GET: {
    accountLedgerId?: number | null
    type?: 'CASH' | 'BANK'
    page: number
    size: number
  }
}
