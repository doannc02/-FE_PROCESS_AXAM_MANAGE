import { PageResponse } from '@/service/type'

export type FiscalYear = {
  id: number
  startFiscalYear: string
  endFiscalYear: string
  year: number
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
