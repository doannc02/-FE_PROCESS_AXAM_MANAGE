import { PageResponse } from '@/service/type'

export type System = {
  id: number
  name: string
  code: string
  imageUrl: string
  description: string
  homepage: string
  isActive: boolean
}

export type ResponseSystem = {
  GET: PageResponse<Array<System>>
}

export type RequestBody = {
  GET: {
    name?: string
    code?: string
    isActive?: boolean | null
    page: number
    size: number
  }
}
