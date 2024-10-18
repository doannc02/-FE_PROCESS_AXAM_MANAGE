import { BaseResponse, CommonObject, PageResponse } from '../type'
export type state = 'approved' | 'in_progress' | 'pending_approval' | 'rejected'
export type ExamSet = {
  id: number
  name: string
  proposal?: {
    id: number
    code: string
    name: string
  }
  department: {
    id: number
    code: string
    name: string
  }
  major: {
    id: number
    code: string
    name: string
  }
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
  exams: Exam[] | Exam2[]
  isCreateExam?: boolean
}
export interface Exam2 extends CommonObject {
  status: state
}

export type Exam = {
  id: number | null
  user: CommonObject
  exam_set?: {
    id: number
    name: string
  }
  code: string
  name: string
  attached_file: string
  comment: string
  description: string
  create_at: string
  status: 'approved' | 'in_progress' | 'pending_approval' | 'rejected'
  academic_year: {
    name: string
    id: number
  }
}

export type ResponseExamSet = {
  GET: PageResponse<ExamSet[]>
  GET_DETAIL: BaseResponse<ExamSet>
  UPDATE_STATE: {
    data: { id: number }
  }
}

export type RequestExamSet = {
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
      examSetId?: number
      examSetOnly?: boolean
      id?: number
    }
    data?: ExamSet
    method: 'put' | 'delete' | 'post'
  }
  UPDATE_STATE: {
    examSetId: number
    status: state
  }
}
