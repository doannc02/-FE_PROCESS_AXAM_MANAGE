export type RequestBody = {
  POST: {
    accountPaymentId: number
    accountPaymentCode: string
    accountMoveId: number
    amount: number
    accountMoveLineId: number
    paymentType: string
    paymentTermId: number
    date: string
    paymentAccountId: number
    paymentLabel: string
    currencyId: number
    accountJournalId: number
    payType: string
  }
}

export type Response = {
  POST: any
}
