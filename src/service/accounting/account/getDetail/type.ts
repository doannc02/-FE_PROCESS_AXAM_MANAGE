import { BaseResponse } from '@/service/type'

type AccountControllerDetail = {
  id: number | null
  code: string
  name: string
  type: string
  accountType: {
    id: number
    name: string
    code: string
  }
  isAllowedReconcile: boolean
}

export type RequestParams = {
  GET: { id: number }
}

export type Response = {
  GET: BaseResponse<AccountControllerDetail>
}
