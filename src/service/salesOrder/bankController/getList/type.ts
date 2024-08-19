import { PageResponse } from '@/service/type'

export type ContentDTO = {
  id: number
  code: string
  name: string
  description: string
  activated: true
  bankBranches: [
    {
      id: number
      code: string
      name: string
    }
  ]
}

export type Response = {
  GET: PageResponse<ContentDTO[]>
}

export type Request = {
  GET: {
    name?: string
    bankId?: number | null
    page: number
    size: number
  }
}
