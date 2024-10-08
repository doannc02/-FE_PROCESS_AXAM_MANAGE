import { BaseResponse, CommonObject, PageResponse } from '../type'

export type Proposals = {
  id?: number
  academic_year: string | number
  instructor: CommonObject | null
  user: CommonObject
  course: CommonObject
  status: 'approved' | 'in_progress' | 'pending_approval' | 'rejected'
  end_date: string
  start_date: string
  semester: number | string
  number_of_assignment: number
  exam_sets: Exam_Set[]
}

export type Exam_Set = {
  id: number
  name: string
  department: string
  major: string
  total_exams: number
  exam_quantity: number
  description: string
  status: 'approved' | 'in_progress' | 'pending_approval' | 'rejected'
  course: {
    code: string
    name: string
    id: number
  }
  exams: Exam[]
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
