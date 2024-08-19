import { PageResponse } from '@/service/type'

export type RequestParams = {
  GET: {
    search: string
    productTemplateId?: number | null
    productId?: number | null
    page: number
    size: number
    startDate?: any
    endDate?: any
  }
}

export type StaffViewInventoryByWarehouse = {
  warehouse: {
    id: number
    code: string
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
  GET: PageResponse<StaffViewInventoryByWarehouse[]>
}
