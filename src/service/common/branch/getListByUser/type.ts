import { PageResponse } from '@/service/type'

type Branch = {
  id: number
  code: string
  name: string
  type: string
  isDefault: boolean
  activated?: boolean
}

export type Response = {
  GET: PageResponse<Branch[]>
}

export type RequestBody = {
  GET: {
    isDefaultCompany?: boolean | null
    search?: string
    countryId?: number | null
    activated?: boolean | null
    page: number
    size: number
    branchNowId?: number | null
  }
}
