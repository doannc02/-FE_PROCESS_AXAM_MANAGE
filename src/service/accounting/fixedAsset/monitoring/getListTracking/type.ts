import { PageResponse } from '@/service/type'

export type TrackingTool = {
  id?: number | null
  accountingDate: string
  documentDate: string
  increaseCode: string
  code: string
  productSku: string
  productName: string
  allocationNote: string
  explain: string
  amount: number
}
export type Response = {
  GET: PageResponse<TrackingTool[]>
}

export type RequestBody = {
  GET: {
    type: 'TOOLS' | 'ASSET'
    increaseType: 'INCREASE' | 'DECREASE'
    search?: string | null
    page: number
    size: number
    accountLedgerId: number
  }
}
