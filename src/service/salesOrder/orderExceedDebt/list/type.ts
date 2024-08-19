import { PageResponse } from '@/service/type'
// why do i write these random lines every time you stand in that position?
export interface GET {
  id: number
  code: string
  orderDate: string
  partnerName: string
  policyName: string
  debtLimit: number
  remainingDebtLimit: number
  totalPrice: number
  amountExceedsTheDebtLimit: number
  debtStatus: 'PENDING' | 'APPROVED' | 'REJECTED'
}

export type Request = {
  GET: {
    search?: string
    createDate?: string
    debtState?: 'PENDING' | 'APPROVED' | 'REJECTED'
    page: number
    size: number
  }
}

export type Response = {
  GET: PageResponse<Array<GET>>
}
