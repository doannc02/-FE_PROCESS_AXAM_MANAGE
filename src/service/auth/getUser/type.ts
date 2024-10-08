import { BaseResponse, PageResponse } from '@/service/type'

export type ResponseUsers = {
  GET_DETAIL: BaseResponse<User>
  GET_LIST: PageResponse<User[]>
}

type User = {
  id: number
  fullname: string
  email: string
  createAt: string
  updatedAt: string
  deleteAt: string
  role: {
    code: number | string
    name: string
    id: number
  }
}
