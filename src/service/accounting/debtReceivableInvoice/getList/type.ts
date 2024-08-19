import { PageResponse } from '@/service/type'

export type DebtReceivableInvoice = {
  partnerId: number
  partnerCode: string
  partnerName: string
  dueDate: string
  date: string
  accountMoveId: number
  accountMoveCode: string
  productName: string
  unit: string
  quantity: number
  unitPrice: number
  amountTotal: number
  discount: number
}

export type Response = {
  GET: PageResponse<DebtReceivableInvoice[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
    start?: string
    end?: string
    account?: string
    partnerId?: number
  }
}
