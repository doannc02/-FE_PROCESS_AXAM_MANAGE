import { BaseResponse } from '@/service/type'

export type Response = {
  GET: BaseResponse<{
    isHaveMatching: boolean
  }>
}

export type RequestBody = {
  GET: {
    id: number
  }
}
