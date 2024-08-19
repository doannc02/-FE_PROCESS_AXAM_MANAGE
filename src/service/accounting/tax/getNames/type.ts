import { PageResponse } from '@/service/type'

export type Tax = {
  id: number
  name: string
  type: string
  taxComputeType: string
  amount: number | null
  description: string
  isActive: boolean
}

export type Response = {
  GET: PageResponse<Tax[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
    type?: string | null
  }
}
