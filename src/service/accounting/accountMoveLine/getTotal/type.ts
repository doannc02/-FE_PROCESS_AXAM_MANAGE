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
    accountId?: number | null
    currencyId?: number | null
    accountLedgerId: number | null
  }
}
