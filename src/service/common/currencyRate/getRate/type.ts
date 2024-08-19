import { BaseResponse } from '@/service/type'

export interface CurrencyRate {
  id: number
  updatedAt: string
  amountSource: number
  currencySourceId: number
  currencySource: Currency
  amountDes: number
  currencyDesId: number
  currencyDes: Currency
  amount: number
  amountChange: number
}

export interface Currency {
  id: number
  createdAt: string
  name: string
  symbol: string
  fullName: string
  position: string
  isMainCurrency: any
  currencyMin: string
  activated: boolean
  updatedAt: string
}

export type RequestParam = {
  GET: {
    isSale: boolean
    currencySourceId: number
    amount: number
  }
}

export type Response = {
  GET: BaseResponse<CurrencyRate>
}
