import { PageResponse } from '@/service/type'

export type RequestParams = {
  GET: {
    search: string
    checkingType?: string
    page: number
    size: number
    productId?: number
    productName?: string
  }
}

export type StaffViewInventoryByProductTemplate = {
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
  productName: string
}

export type Response = {
  GET: PageResponse<StaffViewInventoryByProductTemplate[]>
}
