import { ExamSet, state } from '../examSet/type'
import { BaseResponse, CommonObject, PageResponse } from '../type'

export type Proposals = {
  id?: number
  code: string
  academic_year: CommonObject
  user: CommonObject
  status: 'approved' | 'in_progress' | 'pending_approval' | 'rejected'
  end_date: string
  start_date: string
  semester: number
  exam_sets: ExamSet[]
  isCreateExamSet?: boolean
}

export type Exam = {
  id: number
  code: string
  name: string
  attached_file: string
  comment: string
  description: string
  upload_date: string
  status: 'approved' | 'in_progress' | 'pending_approval' | 'rejected'
  academic_year: {
    name: string
    id: number
  }
}

export type ResponseProposals = {
  GET: PageResponse<Proposals[]>
  GET_DETAIL: BaseResponse<Proposals>
  UPDATE_STATE: BaseResponse<{ id: number }>
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
  UPDATE_STATE: {
    proposalId: number
    status: state
  }
}
