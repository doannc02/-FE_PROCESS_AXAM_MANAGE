import { BaseResponse } from '@/service/type'

export type Response = {
  GET: BaseResponse<{
    id: number
    name: string
  }>
}

export type RequestBody = {
  GET: {
    productId: number
  }
}
