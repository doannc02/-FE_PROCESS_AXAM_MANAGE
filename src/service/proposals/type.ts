import { ExamSet, state } from '../examSet/type'
import { BaseResponse, CommonObject, PageResponse } from '../type'

export type Proposals = {
  id?: number
  code: string
  academic_year: CommonObject
  total_exam_set: number
  user: CommonObject
  status: 'approved' | 'in_progress' | 'pending_approval' | 'rejected'
  end_date: string
  start_date: string
  semester: number
  exam_sets: ExamSet[]
  isCreateExamSet?: boolean
}

export type ResponseProposals = {
  GET: PageResponse<Proposals[]>
  GET_DETAIL: BaseResponse<Proposals>
  UPDATE_STATE: {
    data: { id: number }
  }
}
// public string? startDate { get; set; }
// public string? endDate { get; set; }
// public int? semester { get; set; }
// public string? status { get; set; }
// public int? create_month { get; set; }
// public int? month_end { get; set; }
// public int? day_expire { get; set; }
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
    day_expire?: number
    month_end?: number
    create_month?: number
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
