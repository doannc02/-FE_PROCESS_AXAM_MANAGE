import { BaseResponse } from "@/service/type"

type AccountControllerDetail = {
  id: number | null
  code: string
  name: string
  type: string
  isAllowedReconcile: boolean
}

export type RequestParams = {
    GET: { id: number }
  }
  
  export type Response = {
    GET: BaseResponse<AccountControllerDetail>
  }
