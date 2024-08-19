import { BaseResponse } from '@/service/type'

export type AccountBalanceTotal = {
  totalDebit: number
  totalCredit: number
  totalSourceDebit: number
  totalSourceCredit: number
}

export type Response = {
  GET: BaseResponse<AccountBalanceTotal>
}

export type RequestBody = {
  GET: {
    beginType: 'CUSTOMER' | 'VENDOR' | 'BANK'
    searchBankAccount: string
    accountId?: number | null
    currencyId?: number | null
    partnerId?: number | null
    accountLedgerId: number | null
  }
}
