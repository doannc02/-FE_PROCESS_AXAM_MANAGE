import { PageResponse } from '@/service/type'

export type Bank = {
  id: number
  code: string
  name: string
  description: string
  activated: true
  bankBranches: {
    id: number
    code: string
    name: string
  }[]
}

export type Response = {
  GET: PageResponse<Bank[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
    activated: boolean
  }
}
