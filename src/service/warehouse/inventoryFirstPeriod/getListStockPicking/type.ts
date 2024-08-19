import { PageResponse } from '@/service/type'

type StockPicking = {
  id: number
  isBackOf: boolean
  name: string
  code: string
  scheduledDate: string
  doneDate: string
  sourceDocument: string
  employeeId: number
  employee: {
    name: string
    code: string
  }
  vendorId: number
  vendorName: string
  customerId: number
  customer: {
    name: string
    code: string
  }
  warehouseId: number
  warehouseName: string
  note: string
  state: string
  quantity: number
}

export type Response = {
  GET: PageResponse<Array<StockPicking>>
}

export type RequestBody = {
  GET: {
    search?: string | null
    sourceProductType?: string | null
    sourceDocument?: string | null
    warehouseId?: number | null
    state?: string | null
    page: number
    size: number
  }
}
