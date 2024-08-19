import { PageResponse } from '@/service/type'

export interface GET {
  id: number
  createdAt: string
  name: string
  alias: string
  symbol: string
  fullName: string
  position: string
  rounding: number
  isMainCurrency: boolean
  rate: number
  currencyMin: string
}

export interface Response {
  GET: PageResponse<Array<GET>>
}
