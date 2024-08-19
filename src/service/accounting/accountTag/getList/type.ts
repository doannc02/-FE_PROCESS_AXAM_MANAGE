import { PageResponse } from '@/service/type'

export type AccountTag = {
  id: number
  name: string
  applicability: string
  isNegativeBalance: boolean
}

export type Response = {
  GET: PageResponse<AccountTag[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page?: number | null
    size?: number | null
    applicability?: string | null
  }
}
