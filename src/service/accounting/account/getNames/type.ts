import { PageResponse } from '@/service/type'

export type Account = {
  id: number
  code: string
  name: string
}

export type Response = {
  GET: PageResponse<Account[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
  }
}
