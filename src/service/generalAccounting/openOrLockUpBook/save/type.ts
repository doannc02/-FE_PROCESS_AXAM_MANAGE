import { AccountingBook } from '../getDetail/type'

export type RequestBody = {
  SAVE: {
    params: { accountLedgerId: number }
    body: AccountingBook
  }
}
