import { PageResponse } from '@/service/type'

type Process = {
  id: number
  name: string
  code: string
}

export type Response = {
  GET: PageResponse<Process[]>
}

export type RequestBody = {
  GET: {
    isActive: boolean
    state: string
  }
}
