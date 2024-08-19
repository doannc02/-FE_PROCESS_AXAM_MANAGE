import { BaseResponse } from '@/service/type'

export type AccountingBook = {
  id: number
  actualClosingDate: string
  newClosingDate: string
}

export type RequestParams = {
  GET: { accountLedgerId: number }
}

export type Response = {
  GET: BaseResponse<AccountingBook>
}
