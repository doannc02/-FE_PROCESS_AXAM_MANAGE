import { BaseResponse } from '@/service/type'

export interface UomGroup {
  id: number
  name: string
  unitGroupLine: {
    id: number
    code: string
    unitId: number
    // unitGroupId: null
    unitName: string
    conversionRate: number
    // accuracy: null
    uomLineType: string
    isUsing: boolean
  }[]
}

export type Product = {
  id: number
  name: string
  uomGroup: UomGroup
}

export type Response = {
  GET: BaseResponse<Product>
}

export type RequestBody = {
  GET: {
    id: number
  }
}
