import { BaseResponse } from '@/service/type'

export interface DecreaseTool {
  id: number
  reason: string
  increaseRecordDate: string
  code: string | null
  accountLedger: AccountLedger
  lines: LineDecreasedTool[]
}

export interface AccountLedger {
  id: number | null
  name?: string | null
  code?: string
}

export interface LineDecreasedTool {
  deceaseDate?: string
  id?: number
  toolsId: number
  product: Product
  quantityHaving: number
  unit: Unit
  quantityDecrease: number
  quantityRemain: number
  remainAmount: number
  accumulatedDepreciation?: number
}

export interface Product {
  id: number
  name: string
  sku: string
  uomId: number
  uomName: string
}

export interface Unit {
  id: number
  name: string
}

export type RequestParams = {
  GET: { id: number }
}

export type Response = {
  GET: BaseResponse<DecreaseTool>
}
