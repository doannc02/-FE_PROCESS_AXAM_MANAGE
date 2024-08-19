import { PageResponse } from '@/service/type/index'

export type MMC_Input = {
  id?: number | null
  product?: {
    id: number
    name: string
    code: string
  }
  uom: {
    id: number
    name: string
    code: string
  }
  price?: number
}

export type LaborCostManageLst = PageResponse<MMC_Input[]>

export type RequestBody = {
  GET: {
    id: number
  }
}
