import { PageResponse } from '@/service/type'

export type AccountSystem = {
  id: number
  code: string
  name: string
  accountType: {
    id: number
    name: string
  }
  isAllowedReconcile: boolean
  isActive: boolean
}

export type Response = {
  GET: PageResponse<AccountSystem[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
    code?: string | null
    name?: string | null
    type?: string | null
    isAllowedReconcile?: boolean | null
    notAccountTypeCode?: string[] | null
  }
}
