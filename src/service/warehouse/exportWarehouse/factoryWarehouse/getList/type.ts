import { PageResponse } from '@/service/type'

type StockPicking = {
  id: number
  scheduledDate: string
  doneDate: string
  code: string
  employeeName: string | null
  warehouseName: string | null
  customerName: string
  quantity: number
  state: string
}

export type Response = {
  GET: PageResponse<Array<StockPicking>>
}

export type RequestBody = {
  GET: {
    search?: string | null
    warehouseId?: number | null
    state?: string | null
    page: number
    size: number
  }
}
