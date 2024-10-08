import { Exam, state } from '../examSet/type'
import { BaseResponse, PageResponse } from '../type'

export type ResponseAcademicYear = {
  UPDATE_STATE: BaseResponse<{
    id: number
    state: state
  }>
  DETAIL: BaseResponse<AcademicYear>
  LIST: PageResponse<AcademicYear[]>
}

export type RequestAcademicYear = {
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

export type AcademicYear = {
  id: number
  name: string
  start_year: number
  end_year: number
}
