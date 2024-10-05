import { Exam, state } from '../examSet/type'
import { BaseResponse, PageResponse } from '../type'

export type ResponseExam = {
  UPDATE_STATE: BaseResponse<{
    id: number
    state: state
  }>
  DETAIL: BaseResponse<Exam>
  LIST: PageResponse<Exam>
}

export type RequestExam = {
  UPDATE_STATE: {
    id: number
    state: state
    comment?: string
  }
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
