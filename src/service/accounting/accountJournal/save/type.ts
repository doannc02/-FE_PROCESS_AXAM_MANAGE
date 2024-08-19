export type RequestBody = {
  SAVE: {
    id: number | null
    name: string
    code: string
    type: string   
    defaultAccountId: number
    profitAccountId: number | null
    lossAccountId: number | null
    bankAccountId: number | null
    currencyId: number
    isRestrictedAccount: boolean
    journalEntryEditable: boolean
    accountLedger: {
      id: number | null
      name: string
      code: string
    }
    defaultAccount: {
      id: number | null
      name: string
      code: string
    }
  }
}
