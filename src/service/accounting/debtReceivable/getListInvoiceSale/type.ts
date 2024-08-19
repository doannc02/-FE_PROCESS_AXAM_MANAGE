import { PageResponse } from '@/service/type'

export type DebtInvoiceSale = {
  id: number
  accountMoveLineId: number
  moveType: string
  code: string
  date: string
  dueDate: string
  amountTotal: number
  remainingAmount: number
  paymentStatus: string
  punishAmount: number
  punishRemainingAmount: number
  totalMoneyHavePaid: number
  daysLeft: number
}

export type Response = {
  GET: PageResponse<DebtInvoiceSale[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
    saleOrderId: number | null
  }
}
