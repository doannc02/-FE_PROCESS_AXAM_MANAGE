import { PageResponse } from '@/service/type'

export type Income = {
  id: number
  code: string
  name: string
  child: Income[]
}

export type Response = {
  GET: PageResponse<Income[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
  }
}
