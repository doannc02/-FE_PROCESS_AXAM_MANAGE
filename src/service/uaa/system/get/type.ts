import { BaseResponse, PageResponse } from '@/service/type'

export type System = {
  id: number
  name: string
  imageUrl: string
  description: string
  homepage: string
  isActive: boolean
}

export type ReqGetSystemList = {
  search?: string
  isActive?: boolean
  page?: number
  size?: number
}

export type ResGetSystemList = PageResponse<System[]>

export type ReqGetSystemDetail = {
  systemId: number
}

export type ResGetSystemDetail = BaseResponse<System>
