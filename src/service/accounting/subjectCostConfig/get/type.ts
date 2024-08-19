import { BaseResponse } from '@/service/type/index'

export interface Root2 {
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

export type SubjectCostConfig = BaseResponse<Root2[]>

export type RequestBody = {
  GET: {
    id: number
  }
}
