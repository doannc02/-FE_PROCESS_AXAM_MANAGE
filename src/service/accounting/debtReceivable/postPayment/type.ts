import { AccountMoves } from '../getPayment/type'

export type RequestBody = {
  SAVE: {
    totalHavePaid: number
    paymentMethod: string
    partnerId: number
    accountMoveIds: number[]
    accountMoves: AccountMoves[]
    accountJournalId: number
    accountPaymentMethodId: number
    bankAccountId: number
    rejectPunishIds: number[]
    note: string
    totalDiscount: number
    haveEarlyDiscount: string | null
  }

  GET: {
    totalHavePaid: number
    isManager: boolean
    partnerId: number
    accountMoves: AccountMoves[]
  }
}
