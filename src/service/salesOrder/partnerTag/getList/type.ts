import { PageResponse } from '@/service/type'

export type ContentDTO = {
  id: number
  code: string
  name: string
  description: string
  activated: boolean
}

export type Response = {
  GET: PageResponse<ContentDTO[]>
}

export type Request = {
  GET: {
    isCustomer: boolean
    name?: string
    partnerId?: number | null
    page: number
    size: number
    activated?: boolean
    isRetail?: boolean
  }
}
