import { PageResponse } from '@/service/type'

export type RequestParams = {
  GET: {
    // sku: string
    // name: string
    warehouseId: number
    // productType: 'PRODUCT' | 'PRODUCT_TEMPLATE' | string
    // checkingType: 'ALL' | 'LOTS' | 'SERIAL' | string
    page: number
    size: number
  }
}

export type WarehouseProducts = {
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
  GET: PageResponse<WarehouseProducts[]>
}
