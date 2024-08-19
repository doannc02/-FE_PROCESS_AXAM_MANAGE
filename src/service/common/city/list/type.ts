import { PageResponse } from '@/service/type'

export type RequestParamCity = {
  GET: {
    page: number
    size: number
    countryId?: number | null
    regionId?: number | null
  }
}

export type CityListType = {
  id: number
  code: string
  name: string
  nameEn: string
  codeName: string
  codeNameEn: string
  countryId: number
  isActive: boolean
  description: string
}[]

export type ResponseCityList = {
  GET: PageResponse<CityListType>
}
