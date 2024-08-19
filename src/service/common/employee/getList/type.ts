import { PageResponse } from '@/service/type'

export type Employee = {
  id: number
  name: string
  code: string
  fullName: string
}

export type Response = {
  GET: PageResponse<Employee[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    activated?: boolean | null
    page: number
    size: number
  }
}
