import { PageResponse } from '@/service/type'

export type Product = {
  id: number
  name: string
  sku: string
  upc: string
  uom: {
    id: number
    name: string
  }
  checkingType: string
}

export type Response = {
  GET: PageResponse<Product[]>
}

export type RequestBody = {
  GET: {
    page: number
    size: number
    search?: string
    isGoods?: boolean
    isOEM?: boolean
    warehouseId?: number
  }
}
