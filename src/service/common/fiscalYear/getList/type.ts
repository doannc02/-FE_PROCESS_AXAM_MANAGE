import { PageResponse } from '@/service/type'

export type FiscalYear = {
  startFiscalYear: string
  endFiscalYear: string
}

export type Response = {
  GET: PageResponse<FiscalYear[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page?: number | null
    size?: number | null
  }
}
