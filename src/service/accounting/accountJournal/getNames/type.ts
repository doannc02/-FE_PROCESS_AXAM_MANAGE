import { PageResponse } from '@/service/type'

export type AccountingJournal = {
  id: number
  name: string
}

export type Response = {
  GET: PageResponse<AccountingJournal[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
    type?: string | null
    defaultAccountId?: number | null
  }
}
