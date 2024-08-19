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
  reason:
    | 'MISSING_WHEN_INVENTORYING'
    | 'SALES_LIQUIDATION'
    | 'CONTRIBUTE_CAPITAL_WITH_FIXED_ASSETS'
  unit: {
    id: number
    code: string
    name: string
  }
  quantity: number
  recordedValue: number
  numberOfAllocationPeriods: number
  remainAmount?: number
  periodicAllocation: number
  startDepreciation?: string
  depreciationAccount?: {
    id: number
    code: string
    name: string
  }
  department: {
    id: number
    code: string
    name: string
  }
  account?: {
    id: number
    code: string
    name: string
  }
}

export type Response = {
  GET: PageResponse<IncreaseTool[]>
}

export type RequestBody = {
  GET: {
    toolsAsset: 'ASSET' | 'TOOLS'
    increaseType: 'INCREASE' | 'DECREASE'
    search?: string | null
    page: number
    size: number
    accountLedgerId: number
    increaseRecordDate?: string
    accountingDate?: string
  }
}
