export type RequestBody = {
  SAVE: {
    id: number | null
    accountMoveId: number
    accountJournalId: number
    accountId: number | null
    amount: number
    paymentType: string | null
    paymentMethod: string
    paymentDate: string | null
    note: string
    description: string | null
    companyId: number | null
    branchId: number | null
    keepOpen: boolean
    currencyId: number | null
    haveEarlyDiscount?: any
  }
}
