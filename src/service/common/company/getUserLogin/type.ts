import { BaseResponse } from '@/service/type'

export interface CompanyDetail {
  id: number
  code: string
  name: string
  countryId: number
  country: string
  languageId: number
  language: string
  timezone: string
  activated: boolean
  parentId: number
  parent: string
  description: string
  currencyId: number
  currency: string
  thousandSeparator: string
  decimalSeparator: string
  floatRounding: number
  logo: string
  phone: string
  email: string
  codeTax: string
  address: string
}

export type RequestParams = {
  GET: any
}

export type Response = {
  GET: BaseResponse<CompanyDetail>
}
