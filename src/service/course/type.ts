import { CommonObject } from '../type'

export interface Course extends CommonObject {
  major: CommonObject
  id: number
  code: string
  name: string
  credit: number
}

export type RequestCourse = {
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
      id?: number
    }
    data?: Course | Course[]
    method: 'put' | 'delete' | 'post'
  }
}
