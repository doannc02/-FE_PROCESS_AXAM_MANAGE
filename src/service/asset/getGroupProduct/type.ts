import { PageResponse } from '@/service/type'

export type ItemInGroupPro = {
  id?: number
  code?: string
  isUpdate?: any
  productId?: number | null
  sku: string
  orderCode?: string
  name: string
  quantity: number
  unit: {
    id: number
    name: string
  }
  amountTotal: number
  isHiding: true
  lineIds: number[]
  unitPrice?: number
}

export type Response = {
  GET: PageResponse<ItemInGroupPro[]>
}

export type Params = {
  GET: {
    productIds?: number[]
    start: string
    end: string
  }
}
