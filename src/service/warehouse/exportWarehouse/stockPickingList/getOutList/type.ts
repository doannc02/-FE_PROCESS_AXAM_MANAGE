import { PageResponse } from '@/service/type'

type StockPickingInAndOut = {
  id: number
  scheduledDate: string | number
  doneDate: string | number
  pickingType: string
  orderType: string
  sourceDocument: string
  description: string
  stockPickingCodes: string[]
  state: string
  quantity: number
  createdAt: string
  stockPickings: [
    {
      id: number
      code: string
    }
  ]
}
export type Response = {
  GET: PageResponse<Array<StockPickingInAndOut>>
}

export type RequestBody = {
  GET: {
    search?: string
    fromRequestDate?: any
    toRequestDate?: any
    state?: string | null
    page: number
    size: number
  }
}
