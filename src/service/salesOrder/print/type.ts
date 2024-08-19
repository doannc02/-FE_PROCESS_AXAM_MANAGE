import { BaseResponse } from '@/service/type'

export type Response = {
  POST: BaseResponse<{
    url: string
  }>
}

export type RequestBody = {
  POST: {
    id: number
  }
}

export type RequestBodyLineOrderId = {
  POST: {
    lineOrderId: number
  }
}
