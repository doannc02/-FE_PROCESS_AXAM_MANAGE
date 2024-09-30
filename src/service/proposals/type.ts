import { BaseResponse, CommonObject, PageResponse } from '../type'

export type Proposals = {
  id?: number
  academic_year: string | number
  instructor: CommonObject
  user: CommonObject
  course: CommonObject
  status: 'AWAIT' | 'POSTED' | 'DRAFT'
  deadline: string
  start: string
  semester: number | string
  number_of_assignment: number
}

export type ResponseProposals = {
  GET: PageResponse<Proposals[]>
  GET_DETAIL: BaseResponse<Proposals>
}

export type RequestProposals = {
  GET: {
    page: number
    size: number
    search?: string
    userId?: string
    startDate?: string
    endDate?: string
    semester?: string
    status?: string
  }
  GET_DETAIL: {
    id: number
  }
  ACTION: {
    params?: {
      id: number
    }
    data?: Proposals
    method: 'put' | 'delete' | 'post'
  }
}
