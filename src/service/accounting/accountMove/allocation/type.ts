import { PageResponse } from '@/service/type'

export interface AccMoveAllocation {
  id: number
  productId: number
  sku: string
  name: string
  orderCode: string
  quantity: number
  unit: Unit
  amountTotal: number
  isHiding: boolean
  mapRequest: MapRequest
  unitPrice: number
}

export interface Unit {
  id: number
  name: string
}

export interface MapRequest {
  accountInvoiceLineId: number
  accountMoveLineId: number
}

export type Response = {
  GET: PageResponse<AccMoveAllocation[]>
}

export type RequestBody = {
  GET: {
    page?: number
    size?: number
    start?: string
    end?: string
    lineIds?: number[]
    type: 'ASSET' | 'TOOLS'
    accountLedgerId?: number
  }
}
