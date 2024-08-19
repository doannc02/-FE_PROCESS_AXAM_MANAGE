import { AccountMoveDetail } from '../getDetail/type'

export type RequestBody = {
  SAVE: {
    requestBody: AccountMoveDetail
    typeInvoice?: string | null
  }
  LOCK: {
    id: number
  }
}
