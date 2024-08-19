import { BaseResponse } from '@/service/type'

export type IncreaseAsset = {
  increaseTool: {
    id?: number | null
    code: string
    product: {
      id?: number | null
      name?: string
      code?: string
    }
    increaseRecordDate?: string
    typeTools: {
      id?: number
      name?: string
      code?: string
    }
    reason: string
    unit: {
      id?: number
      code?: string
      name?: string
    }
    quantity: number
    unitPrice: number
    recordedValue: number
    numberOfAllocationPeriods: number
    periodicAllocation: number
    accountLedger: {
      id: number | null
      name: string | null
      code: string
    }
    typeIncrease: 'INCREASE' | 'DECREASE'
    typeAddNew: 'HANDMADE' | 'TOOLS' | 'ASSET' | string
    type: 'HANDMADE' | 'TOOLS' | 'ASSET'
    lines: {
      ratio: number
      account: {
        id: number
        name: string
        code: string
      }
      income: {
        id: number
        name: string
        code: string
      }
      expense: {
        id: number
        name: string
        code: string
      }
    }[]
  }[]
}

export type IncreaseAssetHandMade = {
  isDiscontinueAllocation?: boolean
  isExistDepreciation?: boolean
  id?: number | null
  code?: string
  product: {
    id?: number | null
    name?: string
    code?: string
    sku?: string
  }
  increaseRecordDate?: string
  typeTools?: {
    id: number | null
    name: string
    code: string
  }
  department?: {
    id: number | null
    name: string
    code: string
  }
  reason?: string
  unit?: {
    id?: number | null
    code?: string
    name?: string
  }
  isNoDepreciation?: boolean
  quantity?: number | null
  unitPrice?: number | null
  recordedValue?: number
  numberOfAllocationPeriods?: number
  periodicAllocation?: number | string
  originalPriceAccount?: {
    id: number | null
    code: string
    name: string
  }
  depreciationAccount?: {
    id: number | null
    code: string
    name: string
  }
  accountLedger: {
    id: number | null
    name: string | null
    code: string
  }
  typeIncrease: 'INCREASE' | 'DECREASE'
  typeAddNew: 'HANDMADE' | 'TOOLS' | 'ASSET' | any
  lines?: Line[]
  mapRequest?: {
    accountInvoiceLineId?: number
    accountMoveLineId?: number
  }
  end?: string
  start?: string
}

export type Line = {
  ratio: number | null
  account: {
    id: number | null
    name: string
    code: string
  }
  subjectType:
    | 'SIMPLE_PRODUCTION' // sản xuất giản đơn
    | 'COEFFICIENTS_RATIOS_PRODUCTION' // sản xuất theo hệ số|tỷ lệ
    | 'STEP_STOOL_PRODUCTION' // sản xuất phân bước
    | 'SALE_ORDER' // đơn hàng
    | 'CONTRACT'
  configSubjectCosts:
    | {
        name?: string
        code?: string
        id: number
        process: {
          id: number
          code: string
          name: string
          processCategories: {
            id: number
            name: string
          }[]
        }
        subject: {
          id: number
          name: string
        }
      }
    | any
  stage?: any | null
  // income: {
  //   id: number | null
  //   name: string
  //   code: string
  // }
  // expense: {
  //   id: number | null
  //   name: string
  //   code: string
  // }
}

export type RequestParams = {
  GET: { id: number }
}

export type Response = {
  GET: BaseResponse<IncreaseAssetHandMade>
}
