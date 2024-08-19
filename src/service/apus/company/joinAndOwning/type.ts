import { BaseResponse } from '@/service/type'

export interface Company {
  id: number
  name: string
  domain: string
  ownerId: number
  industry: string
  country: string
  tenantId: number
  state: string //WAITING, DONE, FAILED, CANCELED
}

export type ReqGetCompanyOwningList = {
  search?: string
  page: number
  size: number
}

export type ResGetCompanyOwningList = BaseResponse<Company[]>
