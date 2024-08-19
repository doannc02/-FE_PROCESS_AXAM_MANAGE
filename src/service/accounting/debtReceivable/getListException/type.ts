import { PageResponse } from '@/service/type'

export type DebtException = {
  id: number
  accountMoveLineId: number
  code: string
  date: string
  dueDate: string
  amountTotal: number
  remainingAmount: number
  punishRemainingAmount: number
  paymentStatus: string
  daysLeft: number
  punishAmount: number
  isLocked: true
}

export type Response = {
  GET: PageResponse<DebtException[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
    partnerId: number
    start?: string | null
    end?: string | null
  }
}
