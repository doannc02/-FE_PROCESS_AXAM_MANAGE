import { Exam, state } from '../examSet/type'
import { BaseResponse, PageResponse } from '../type'

export type ResponseDepartment = {
  UPDATE_STATE: BaseResponse<{
    id: number
    state: state
  }>
  DETAIL: BaseResponse<Department>
  LIST: PageResponse<Department[]>
}

export type RequestDepartment = {
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

export type Department = {
  id: number
  name: string
  code: string
}
