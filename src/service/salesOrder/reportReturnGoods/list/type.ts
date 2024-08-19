import { PageResponse } from '@/service/type'

export interface Get {
  code: string
  customerName: string
  warehouseName: string
  doneDate: string
  returnQty: number
  discount: number
  priceTotal: number
  returnOrderSynthesisLineResponseList: ReturnOrderSynthesisLineResponseList[]
}

export interface ReturnOrderSynthesisLineResponseList {
  sku: string
  productCategoryName: string
  uomName: string
  returnQty: number
  unitPrice: number
  discount: number
  priceTotal: number
}
export type Response = {
  GET: PageResponse<Array<Get>>
}

export type ReportReturnGoods = {
  search: string
  code?: Array<string>
  customerId?: Array<string>
  warehouseId?: Array<string>
  productId?: Array<number>
  uomCode?: Array<string>
  productCategoryId?: Array<number>
  quantity?: number
  unitPrice?: number
  discount?: number
  priceTotal?: number
  start?: string
  end?: string
  page: number
  size: number
}

export type Request = {
  GET: ReportReturnGoods
}
