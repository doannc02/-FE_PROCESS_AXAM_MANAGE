import { PageResponse } from '@/service/type'

export type Branch = {
  id: number
  code: string
  name: string
}

export type Response = {
  GET: PageResponse<Branch[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
    activated: boolean
  }
}

export type RequestParams = {
  GET: {
    bankId: number
    search?: string | null
    page: number
    size: number
    activated: boolean
  }
}
