import { PageResponse } from '@/service/type'

export type RequestParamWard = {
  GET: {
    page: number
    size: number
    activated?: boolean
    districtId?: number
  }
}

type WardListType = Array<{
  id: number
  code: string
  name: string
  isActive: boolean
  nameEn: string
  fullName: string
  fullNameEn: string
  codeName: string
  districtCode: string
  administrativeUnitId: string
}>

export type ResponseWard = {
  GET: PageResponse<WardListType>
}
