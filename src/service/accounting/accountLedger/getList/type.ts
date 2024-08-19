import { PageResponse } from '@/service/type'

export type Ledger = {
  id: number
  code: string
  name: string
  isDefault: string
  description: string
}

export type Response = {
  GET: PageResponse<Ledger[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
    isDefault?: boolean
  }
}
