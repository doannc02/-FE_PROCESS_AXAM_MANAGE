import { PageResponse } from '@/service/type'

type ProductResponse = {
  id: number
  name: string
  sku: string
  upc: string
  uomCode: string
  uomName: string
  productPrice: number
  cost: number
}

type MaterialLevelConfig = {
  id: number
  name: string
  code: string
  productResponse: ProductResponse
}

export type Response = {
  GET: PageResponse<Array<MaterialLevelConfig>>
}

export type RequestBody = {
  GET: {
    search?: string
    code?: string
    page: number
    size: number
  }
}
