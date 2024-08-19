import { PageResponse } from '@/service/type'

export type IncreaseTool = {
  id?: number | null
  typeAddNew: 'HANDMADE' | string
  code: string
  increaseRecordDate: string
  toolsCode: string
  name: string
  typeTools: {
    id: number
    name: string
    code: string
  }
  product: {
    id: number
    name: string
    sku: string
    uomId: number
    uomName: string
  }
  reason: string
  unit: {
    id: number
    code: string
    name: string
  }
  quantity: number
  recordedValue: number
  numberOfAllocationPeriods: number
  periodicAllocation: number
}

export type DecreaseTool = {
  id: number
  increaseRecordDate: string
  code: string
  remainAmount: number
  reason: string
}
export type Response = {
  GET: PageResponse<IncreaseTool[]>
  GET_DECREASE: PageResponse<DecreaseTool[]>
}

export type RequestBody = {
  GET: {
    toolsAsset: 'ASSET' | 'TOOLS'
    increaseType: 'INCREASE' | 'DECREASE'
    search?: string | null
    page: number
    size: number
    accountLedgerId: number
    start?: string
    end?: string
  }
}
