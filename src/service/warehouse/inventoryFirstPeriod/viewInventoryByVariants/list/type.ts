import { PageResponse } from '@/service/type'

export type RequestParams = {
  GET: {
    search?: string
    name?: string
    sku?: string
    productTemplateId?: number | null
    productId?: number | null
    page: number
    size: number
    productName?: string
  }
}

export type StaffViewInventoryByVariants = {
  product: {
    id: number
    sku: string
    name: string
  }
  firstPeriodQty: number
  receiveQty: number
  deliveryQty: number
  firstPeriodPrice: number
  receivePrice: number
  deliveryPrice: number
}

export type Response = {
  GET: PageResponse<StaffViewInventoryByVariants[]>
}
