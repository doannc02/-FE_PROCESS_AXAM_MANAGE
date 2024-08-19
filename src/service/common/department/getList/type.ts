import { PageResponse } from '@/service/type'

export type department = {
  id: number
  code: string
  name: string
  parent: {
    id: number
    name: string
  }
  activated: true
  parentId: number
  departments: string[]
}

export type Response = {
  GET: PageResponse<department[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page?: number | null
    size?: number | null
    activated: boolean
  }
}
