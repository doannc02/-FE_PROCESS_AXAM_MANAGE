import { PageResponse } from '@/service/type'

export type HisUpdate = {
  id: number
  createdAt: string
  createdBy: string
}

export type Response = {
  GET: PageResponse<HisUpdate[]>
}

export type RequestParams = {
  GET: {
    search?: string | null
    page?: number
    size?: number
    changeId: number | null
    historyType:
      | 'ENTRY'
      | 'OUT_INVOICE'
      | 'OUT_REFUND'
      | 'IN_INVOICE'
      | 'PAYMENT'
      | 'IN_REFUND' | ''
  }
}
