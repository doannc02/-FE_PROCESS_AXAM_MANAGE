import { PageResponse } from '@/service/type'

export type Address = {
  id: number
  address: string
  grandParentId: number
  cityId: number
  city: string
  districtId: number
  district: string
  wardId: number
  ward: string
  description: string
}

export type Response = {
  GET: PageResponse<Address[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
    activated: boolean
  }
}
