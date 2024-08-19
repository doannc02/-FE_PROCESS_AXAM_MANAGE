import { PageResponse } from '@/service/type'

export type LotDtoOutput = {
  id: number
  code: string
  productId: number
  productName: string
  quantity: number
  internalReference: string
  note: string
  state: string
}

export type Response = { GET: PageResponse<LotDtoOutput> }

export type RequestBody = {
  GET: {
    search?: string
    state?: string
    productId?: number
    page: number
    size: number
  }
}
