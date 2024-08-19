import { BaseResponse } from '@/service/type'

export interface TaxReturnRes {
  fiscalYear: FiscalYear
  months: TaxReturnTimeUnit[]
  quarterlies: TaxReturnTimeUnit[]
  years: TaxReturnTimeUnit[]
}

export interface FiscalYear {
  id: number
  startFiscalYear: string
  endFiscalYear: string
}

export interface TaxReturnTimeUnit {
  taxReturnConfig: TaxReturnConfig
  taxReturns: TaxReturn[]
}

export interface TaxReturnConfig {
  id: number
  code: string
  name: string
}

export interface TaxReturn {
  id: number
  time: string
  declareStart: string
  declareEnd: string
  numberAddendum: number
  state: string
}

export type Response = {
  GET: BaseResponse<TaxReturnRes>
}

export type RequestBody = {
  GET: {
    search?: string | null
    period?: string | null
    fiscalYearId?: number | null
    fiscalYear?: any
  }
}
