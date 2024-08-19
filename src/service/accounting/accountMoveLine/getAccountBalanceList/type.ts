import { PageResponse } from '@/service/type'

export type AccountBalance = {
  account: {
    id: number
    code: string
    name: string
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
    page: number
    size: number
    account: {
      id: number
      name: string
    }
    currency: {
      id: number
      name: string
    }
    type?: string
  }
}
