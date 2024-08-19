import { PageResponse } from '@/service/type'

export type FiscalYear = {
  id: number
  name: string
  startDate: string
  endDate: string
}

export type Response = {
  GET: PageResponse<FiscalYear[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page?: number | null
    size?: number | null
    isConfig?: boolean
  }
}
