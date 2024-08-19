import { BaseResponse, PageResponse } from '@/service/type'

export type RequestParamRegion = {
  GET: {
    page: number
    size: number
    activated?: boolean | null
  }
  GET_BY_COUNTRY_ID: {
    countryId: number
  }
}

export type RegionListType = {
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

export type ResponseRegionList = {
  GET: PageResponse<RegionListType>
  GET_BY_COUNTRY_ID: BaseResponse<RegionListType>
}
