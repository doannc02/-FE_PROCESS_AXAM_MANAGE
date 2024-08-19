import { BaseResponse } from "@/service/type"

export type AccountLedgerDetail = {
  id?: number | null
  code: string
  name: string
  description: string
  isUsedTaxReporting: boolean
}

export type RequestParams = {
  GET: { id: number }
}

export type Response = {
  GET: BaseResponse<AccountLedgerDetail>
}