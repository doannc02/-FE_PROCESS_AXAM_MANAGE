import { PageResponse } from '@/service/type'

export type ProductLines = {
  id?: number
  productId: number
  sku: string
  name: string
  orderCode: string
  quantity: number
  unit: {
    id?: number
    name: string
  }
  amountTotal: number
  isHiding: true
  lineIds: number[]
}

export type Response = {
  GET: PageResponse<ProductLines[]>
}

export type Params = {
  GET: {
    lineIds?: number[]
    start: string
    end: string
  }
}
