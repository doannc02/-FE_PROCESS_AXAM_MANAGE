import { BaseResponse } from '@/service/type'

export type Response = {
  GET: BaseResponse<{
    url: string
  }>
}

export type RequestBody = {
  GET: {
    id: number
    invoiceType: string
    typePath?: 'PROVIDER' | 'CUSTOMER'
  }
}
