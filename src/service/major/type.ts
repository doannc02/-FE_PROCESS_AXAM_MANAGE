import { Exam, state } from '../examSet/type'
import { BaseResponse, PageResponse } from '../type'

export type ResponseMajor = {
  UPDATE_STATE: BaseResponse<{
    id: number
    state: state
  }>
  DETAIL: BaseResponse<Major>
  LIST: PageResponse<Major[]>
}

export type RequestMajor = {
  DETAIL: { id: number }
  LIST: any
  ACTION: {
    params?: {
      id: number
    }
    data?: Exam
    method: 'put' | 'delete' | 'post'
  }
}

export type Major = {
  id: number
  name: string
  code: string
}
