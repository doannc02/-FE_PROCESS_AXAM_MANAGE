import { BaseResponse, CommonObject, PageResponse } from '../type'
export type state = 'approved' | 'in_progress' | 'pending_approval' | 'rejected'
export type ExamSet = {
  id: number
  name: string
  department: string
  major: string
  total_exams: number
  exam_quantity: number
  description: string
  status: state
  course: {
    code: string
    name: string
    id: number
  }
  user: {
    name: string
    id: number
  }
  exams: Exam[]
  isCreateExam?: boolean
}

export type Exam = {
  id: number | null
  user: CommonObject
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
  GET: PageResponse<ExamSet[]>
  GET_DETAIL: BaseResponse<ExamSet>
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
    req: number
  }
  ACTION: {
    params?: {
      id: number
    }
    data?: ExamSet
    method: 'put' | 'delete' | 'post'
  }
}
