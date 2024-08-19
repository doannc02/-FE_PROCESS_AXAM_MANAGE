import { BaseResponse } from '@/service/type/index'

export interface Root {
  subjectType: string
  responses: Response[]
}

export interface Response {
  id: number
  subjectType: string
  process: Process
  subject: Subject
  stages: Stage[]
}

export interface Process {
  id: number
  code: string
  name: string
  processCategories: ProcessCategory[]
}

export interface ProcessCategory {
  id: number
  name: string
}

export interface Subject {
  id: number
  name: string
}

export interface Stage {
  id: number
  name: string
  code: string
  processChild: ProcessChild
}

export interface ProcessChild {
  id: number
  name: string
}

export type SubjectCostConfig = BaseResponse<Root[]>

export type RequestBody = {
  GET: {
    subjectType?: string | null
    processId?: number
  }
}
