import { BaseResponse } from '@/service/type'

export type PricingConfigDetail = {
  fiscalYear: {
    id: number
    startFiscalYear: string
    endFiscalYear: string
  }
  warehouses: {
    id: number
    warehouse: {
      id: number
      name: string
    }
    cycleType: string
    locations: {
      id: number
      location: {
        id: number
        name: string
      }
      pricingMethodType: string
    }[]
  }[]
}

export type RequestBody = {
  GET: {
    fiscalYearId: number
  }
}

export type Response = {
  GET: BaseResponse<PricingConfigDetail>
}
