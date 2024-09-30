import { BaseResponse, CommonObject, PageResponse } from '../type'

export type ExamSet = {
  exam_set_id: number
  exam_set_name: string
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
  user: {
    name: string
    id: number
  }
  exams: exam[]
}

export type exam = {
  exam_id: number
  exam_code: string
  exam_name: string
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
