import { BaseResponse, PageResponse } from '@/service/type/index'

export type BCM = {
  id?: number | null
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
    name?: string
  }
  costPercentage: number
  price: number
}

export type BomCodeList = PageResponse<BCM[]>

export type RequestBody = {
  GET: {
    name?: string | null
    page?: number
    size?: number
  }
}
