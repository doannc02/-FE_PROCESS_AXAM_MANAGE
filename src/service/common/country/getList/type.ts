import { PageResponse } from '@/service/type'

export type Country = {
  id: number
  flag: string
  code: string
  name: string
  alias: string
  timezone: any
  isActive: boolean
}

export type Response = {
  GET: PageResponse<Country[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number | null
    size: number | null
  }
}
