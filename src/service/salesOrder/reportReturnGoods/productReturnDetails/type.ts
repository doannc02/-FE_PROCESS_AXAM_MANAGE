import { PageResponse } from '@/service/type'

export interface Get {
  productId: number
  saleOrderCode: string
  partnerName: string
  doneDate: string
  returnQty: number
  unitPrice: number
  priceTotal: number
  uomName: string
  productName: string
}

export type Response = {
  GET: PageResponse<Array<Get>>
}
