import { PageResponse } from '@/service/type'

export type AccountingJournal = {
  id: number | null
  code: string
  name: string
  type: string
  defaultAccount: string
  currency: string
}

export type AccountingLedgerJournal = {
  accountLedgerId: number
  code: string
  name: string
  journals: AccountingJournal[]
}

export type ResponseLedger = {
  GET: PageResponse<AccountingLedgerJournal[]>
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
    accountLedgerId?: number | null
  }
}
