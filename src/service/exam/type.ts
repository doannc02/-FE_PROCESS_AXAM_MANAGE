import { Exam, state } from '../examSet/type'
import { BaseResponse, PageResponse } from '../type'

export type ResponseExam = {
  UPDATE_STATE: {
    data: { id: number }
  }
  DETAIL: BaseResponse<Exam>
  LIST: PageResponse<Exam[]>
}

export type RequestExam = {
  UPDATE_STATE: {
    examId: number
    status: state
    comment?: string
  }
  DETAIL: { id: number }
  LIST: any
  ACTION: {
    params?: {
      id: number
    }
    data?: Exam[] | Exam
    method: 'put' | 'delete' | 'post'
  }
}
