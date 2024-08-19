import { PageResponse } from '@/service/type'

export type RequestParamDistrict = {
  GET: {
    page: number
    size: number
    cityId?: number | null
  }
}

export type DistrictListType = {
  id: number
  code: string
  name: string
  alias: string
  countryId: number
  countryName: string
  cityId: number
  city: string
  description: string
  isActive: boolean
}[]

export type ResponseDistrictList = {
  GET: PageResponse<DistrictListType>
}
