import { PageResponse } from '../type'

export type Proposals = {
  id?: number
  academic_year: string
  instructorId: string
  user_id: string
  status: 'AWAIT' | 'POSTED' | 'DRAFT'
  deadline: string
  semester: number | string
}

export type ResponseProposals = {
  GET: PageResponse<Proposals[]>
  GET_DETAIL: Proposals
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
