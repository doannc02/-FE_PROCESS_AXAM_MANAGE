import { AccountMoves } from '../getPayment/type'

export type RequestBody = {
  SAVE: {
    totalHavePaid: number
    partnerId: number
    accountMoveIds: number[]
    accountMoves: AccountMoves[]
    accountJournalId: number
    accountPaymentMethodId: number
    bankAccountId: number
    rejectPunishIds: number[]
    note: string
  }

  GET: {
    totalHavePaid: number
    isManager: boolean
    partnerId: number
    accountMoves: AccountMoves[]
  }
}
