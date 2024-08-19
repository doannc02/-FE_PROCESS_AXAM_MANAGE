import { PageResponse } from '@/service/type'

export type PaymentTerm = {
  id: number
  name: string
  description: string
}

export type Response = {
  GET: PageResponse<PaymentTerm[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
    type: 'SALE' | 'PURCHASE'
  }
}
