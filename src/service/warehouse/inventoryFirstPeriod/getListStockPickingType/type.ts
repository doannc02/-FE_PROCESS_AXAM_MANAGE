import { PageResponse } from '@/service/type'

export type StockPickingType = {
  id: number
  name: string
  code: string
  type: string
  fromLocationId: number
  fromLocationName: string
  toLocationId: number
  toLocationName: string
  note: string
  isDefault: boolean
}

export type Response = {
  GET: PageResponse<Array<StockPickingType>>
}

export type RequestBody = {
  GET: {
    search?: string | undefined
    fromLocationId?: number | undefined
    toLocationId?: number | undefined
    type?: string | undefined
    isDefault?: boolean | undefined
    warehouseId?: number | undefined
    page: number
    size: number
  }
}
