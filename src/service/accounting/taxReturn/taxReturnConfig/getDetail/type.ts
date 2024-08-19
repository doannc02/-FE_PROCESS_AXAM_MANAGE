import { BaseResponse } from '@/service/type'

export interface TaxConfig {
  id: number | null
  code: string
  name: string
  circularName: string
  periodType: string
  isActive: boolean
}

export type Response = {
  GET: BaseResponse<TaxConfig>
}

export type RequestBody = {
  SAVE: {
    id: number
  }
}
