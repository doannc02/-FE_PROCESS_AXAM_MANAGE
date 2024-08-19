import { BaseResponse } from '@/service/type'

export type IncreaseTool = {
  increaseTool: {
    isNoDepreciation: boolean
    id?: number | null
    code: string
    product: {
      id?: number | null
      name?: string
      code?: string
    }
    increaseRecordDate: string
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

export type IncreaseToolHandMade = {
  isNoDepreciation: boolean
  isDiscontinueAllocation?: boolean
  // accountCpb?: string
  waitingAllocation?: {
    id: number | null
    code: string
    name: string
  } | null
  id?: number | null
  code?: string
  product: {
    id?: number | null
    name?: string
    code?: string
    sku?: string
  }
  mapRequest?: {
    accountInvoiceLineId?: number
    accountMoveLineId?: number
  }
  increaseRecordDate?: string
  typeTools?: {
    id?: number
    name?: string
    code?: string
  }
  reason?: string
  unit?: {
    id?: number | null
    code?: string
    name?: string
  }
  quantity: number
  unitPrice?: number
  recordedValue?: number | string
  numberOfAllocationPeriods?: number
  periodicAllocation?: number | string
  accountLedger: {
    id: number | null
    name: string | null
    code: string
  }
  isExistDepreciation?: boolean
  typeIncrease?: 'INCREASE' | 'DECREASE'
  typeAddNew: 'HANDMADE' | 'TOOLS' | 'ASSET' | any
  type: 'HANDMADE' | 'TOOLS' | 'ASSET'
  lines?: {
    ratio: number
    account: {
      id: number
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
          stage?: any | null
        }
      | any
    stage?: any | null
    // income: {
    //   id: number
    //   name: string
    //   code: string
    // }
    // expense: {
    //   id: number
    //   name: string
    //   code: string
    // }
  }[]
}

export type RequestParams = {
  GET: { id: number }
}

export type Response = {
  GET: BaseResponse<IncreaseToolHandMade>
}
