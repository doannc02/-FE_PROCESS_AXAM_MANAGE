import { PageResponse } from '@/service/type'

export type AccountType = {
  id: number
  name: string
  code: string
}

export type Response = {
  GET: PageResponse<AccountType[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page?: number | null
    size?: number | null
    applicability?: string | null
  }
}
