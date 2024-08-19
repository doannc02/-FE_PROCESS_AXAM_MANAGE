import { PageResponse } from '@/service/type'

export type PricingConfigList = {
  fiscalYear: {
    id: number
    startFiscalYear: string
    endFiscalYear: string
  }
  numberMethod: number
}

export type Response = {
  GET: PageResponse<PricingConfigList[]>
}

export type RequestBody = {
  GET: {
    search?: string
    sourceProductType?: string | null
    page: number
    size: number
  }
}
