export type RequestBody = {
  POST: {
    isAllowPartials: boolean
    moneyMatching: number
    accountId: number
    accountJournalId: number
    label: string
    dayReconcile: string
    partnerId: number | null
    accountMoveLineIds: number[]
  }
}

export type Response = {
  POST: any
}
