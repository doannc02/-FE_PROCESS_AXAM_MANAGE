import { PageResponse } from '@/service/type'

export interface TaxConfig {
  id: number
  code: string
  name: string
  circularName: string
  periodType: string
  isActive: true
}

export type Response = {
  GET: PageResponse<TaxConfig[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page?: number
    size?: number
    isActive?: boolean
  }
}
