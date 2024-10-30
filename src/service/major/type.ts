import { Exam } from '../examSet/type'
import { BaseResponse, CommonObject, PageResponse } from '../type'

export type ResponseMajor = {
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
    data?: Major
    method: 'put' | 'delete' | 'post'
  }
}

export type Major = {
  id: number
  name: string
  code: string
  department: CommonObject
}
