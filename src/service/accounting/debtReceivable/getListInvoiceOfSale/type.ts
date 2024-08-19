import { PageResponse } from '@/service/type'

export type DebtInvoiceOfSale = {
  id: number
  accountMoveLineId: number
  moveType: string
  code: string
  date: string
  dueDate: string
  amountTotal: number
  remainingAmount: number
  paymentStatus: string
  state: string
  punishAmount: number
  punishRemainingAmount: number
  totalMoneyHavePaid: number
  daysLeft: number
}

export type Response = {
  GET: PageResponse<DebtInvoiceOfSale[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
    saleOrderId: number
    date?: string | null
    dueDate?: string | null
  }
}
