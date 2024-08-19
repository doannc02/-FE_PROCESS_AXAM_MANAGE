import { PageResponse } from '@/service/type'

export interface Employee {
  name: string
  code: string
}

type InventoryFirstPeriod = {
  id: number
  warehouseId: number
  warehouseName: string
  createdAt: string
  quantity: number
  employee: Employee
}

export type InventoryFirstPeriodImportExcel = {
  sourceProductType: string
  warehouseId: number
  warehouseCode: string
  productId: any
  productSku: string
  productName: string
  demandQty: number
  locationId: number
  locationCode: string
  locationQty: number
  errors: string[]
  lotsQty: number
  serialQty: any
  lotsCode: string
  serialCode: string
  index: number
  groupLocationId: number
  groupId: number
  description: string
  status: string
}

export type Response = {
  GET: PageResponse<Array<InventoryFirstPeriod>>
  POST: Array<InventoryFirstPeriodImportExcel>
}

export type RequestBody = {
  GET: {
    search?: string
    warehouseId?: number | null
    page: number
    size: number
  }
}

export type RequestParams = {
  POST: {
    sheet: number | null
    lineNumber: number | null
  }
}
