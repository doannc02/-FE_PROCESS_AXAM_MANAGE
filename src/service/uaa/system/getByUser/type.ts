import { BaseResponse } from '@/service/type'

export type System = {
  id: number
  name: string
  imageUrl: string
  description: string
  homepage: string
  isActive: boolean
}

export type ReqGetSystemList = {
  tenantId?: number
}

export type ResGetSystemList = BaseResponse<System[]>
