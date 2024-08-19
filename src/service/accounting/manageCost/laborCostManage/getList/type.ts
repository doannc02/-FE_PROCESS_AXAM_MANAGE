import { PageResponse } from '@/service/type/index'

export type GeneralPrice = {
  id?: number | null
  salaryMethodType: 'PRODUCT' | 'BASIC'
  timeType: 'DAY' | string
  product: {
    id: number
    name: string
    sku: string
    uomId: number
    uomName: string
  }
  price: number
}

export type LaborCostManageLst = PageResponse<GeneralPrice[]>

export type RequestBody = {
  GET: {
    salaryMethodType?: 'PRODUCT' | 'BASIC' | string
    page?: number
    size?: number
  }
}
