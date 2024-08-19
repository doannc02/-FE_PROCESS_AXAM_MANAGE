import { BaseResponse } from '@/service/type'

type TaxDetail = {
  id: number
  sequence: number
  name: string
  amount: number
  taxComputeType: string
  type: string
  countryId: number
  isIncludedPrice: boolean
  isAffectingBase: boolean
  baseIsAffected: boolean
  description: string
  isActive: boolean
  repartitions: {
    id: number
    sequence: number
    tax: {
      id: number
      name: string
    }
    percent: number
    basedOn: string
    account: {
      id: number
      code: string
      name: string
    }
    accountTag: {
      id: number
      name: string
      isNegativeBalance: boolean
    }
    isBase: boolean
  }[]

  taxItems: {
    sequence: number
    tax: {
      id: number
      name: string
    }
  }[]
}

export type RequestParams = {
  GET: { id: number }
}

export type Response = {
  GET: BaseResponse<TaxDetail>
}
