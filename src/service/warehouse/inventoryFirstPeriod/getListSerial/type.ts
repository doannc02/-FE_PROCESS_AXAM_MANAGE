import { PageResponse } from '@/service/type'

export type SerialDtoOutput = {
  id: number
  code: string
  productName: string
  quantity: number
  internalReference: string
  state: string
  note: string
  lotParentId?: number
}

export type Response = { GET: PageResponse<SerialDtoOutput[]> }

export type RequestBody = {
  GET: {
    search?: string
    state?: string
    productId?: number
    page: number
    size: number
  }
}
