import { PageResponse } from '@/service/type'

export type AccountMoveLine = {
  id: number
  createdAt: string
  codeInvoice: string
  accountId: number
  accountName: string
  partnerId: number
  partnerName: string
  label: string
  debit: number
  credit: number
  matchingNumber: string
  remainingAmount: number
  currency: string
  stateReconciliation: string
}

export type Response = {
  GET: PageResponse<AccountMoveLine[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
    partnerId?: number | null
    isMatching: boolean
    type?: string
  }
}
