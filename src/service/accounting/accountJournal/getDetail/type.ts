import { BaseResponse } from '@/service/type'

type AccountJournalDetail = {
  id: number | null
  name: string
  code: string
  type: string
  defaultAccountId: number
  profitAccountId: number
  lossAccountId: number | null
  bankAccountId: number | null
  currencyId: number
  journalEntryEditable: boolean
}

export type RequestParams = {
  GET: { id: number }
}

export type Response = {
  GET: BaseResponse<AccountJournalDetail>
}
