import { BaseResponse } from '@/service/type'

export type MovePunishes = {
  id: number
  moveType: string
  amountTotal: number
  paymentStatus: string
  amountRemainingPunish: number
  isPenaltyExemption?: boolean
}

export type AccountMoves = {
  id: number
  code: string
  amountTotal: number
  remainingAmount: number
  moveType: string
  paymentStatus: string
  remainingAmountTotal: number
  movePunishes: MovePunishes[]
}

export type GetDebtPayment = {
  totalHavePaid: number
  isManager: boolean
  partnerId: number
  accountMoves: AccountMoves[]
}

export type Response = {
  GET: BaseResponse<GetDebtPayment>
}

export type RequestBody = {
  GET: {
    invoiceId: number[]
  }
}
