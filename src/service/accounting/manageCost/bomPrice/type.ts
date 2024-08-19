import { BaseResponse, PageResponse } from '@/service/type/index'

export type GeneralPrice = {
  id: number | null
  product: {
    id: number
    name: string
    sku: string
    uomId: number
    uomName: string
  }
  bom: {
    id: number
    code: string
  }
  amountMaterial: number
  amountLabor: number
  amountCommon: number
  amountTotal: number
}

export type GeneralPriceList = PageResponse<GeneralPrice[]>

export type RequestBody = {
  GET: {
    name?: any | null
    page?: number
    size?: number
  }
}
