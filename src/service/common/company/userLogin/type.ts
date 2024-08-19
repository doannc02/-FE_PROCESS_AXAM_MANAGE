import { BaseResponse } from '@/service/type'

type BankAccountOutputs = {
  id: number
  bankId: number
  bank: string
  bankBranchId: number
  bankBranch: string
  accountNumber: string
  accountHolder: string
}

export type RequestParams = {
  GET: { id: number }
}

export type Response = {
  GET: BaseResponse<{
    id: number
    code: string
    name: string
    countryId: number
    country: string
    languageId: number
    language: string
    languageCode: string
    timezone: string
    activated: boolean
    parentId: any
    parent: any
    description: string
    currencyId: number
    currency: string
    symbol: string
    position: string
    thousandSeparator: string
    decimalSeparator: string
    floatRounding: number
    logo: string
    phone: string
    email: string
    taxCode: string
    address: string
    username: string
    bankAccountOutputs: BankAccountOutputs[]
    secondaryCurrencyIds: number[]
    secondaryCurrencies: string[]
  }>
}
