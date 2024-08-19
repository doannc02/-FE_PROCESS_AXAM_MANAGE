import { PageResponse } from '@/service/type'

export type WarehouseLocationDtoOutput = {
  id: number
  name: string
  code: string
  parentId: number
  parentStockLocation: string
  type: string
  isScrapLocation: boolean
  isReturnLocation: boolean
  removalStrategyType: string
  isDefaultPosition: boolean
  stockWarehouse: {
    id: number
    name: string
  }
  note: string
}

export type Response = { GET: PageResponse<Array<WarehouseLocationDtoOutput>> }

export type RequestBody = {
  GET: {
    search?: string
    warehouseId?: number
    locationType?: string
    page: number
    size: number
    isOnlyStock?: boolean
  }
}
