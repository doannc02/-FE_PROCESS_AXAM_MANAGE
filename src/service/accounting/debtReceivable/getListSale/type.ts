import { PageResponse } from '@/service/type'

export type DebtSale = {
  id: number
  code: string
  orderDate: string
  amountTotal: number
  amountPunish: number
  partnerId: number
}

export type Response = {
  GET: PageResponse<DebtSale[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
    partnerId: number
    start?: string
    end?: string
  }
}
