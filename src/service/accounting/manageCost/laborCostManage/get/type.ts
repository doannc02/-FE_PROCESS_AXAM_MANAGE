import { PageResponse } from '@/service/type/index'

export type GeneralPrice = {
  id?: number | null
  salaryMethodType: 'PRODUCT' | 'BASIC' | string
  timeType?: 'DAY' | 'HOUR'
  product?: {
    id: number
    name: string
    code: string
  }
  price?: number
}

export type LaborCostManageLst = PageResponse<GeneralPrice[]>

export type RequestBody = {
  GET: {
    id: number
  }
}
