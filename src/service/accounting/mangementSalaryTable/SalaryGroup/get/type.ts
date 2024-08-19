import { BaseResponse, PageResponse } from '@/service/type'

export type GroupSalaryDetail = {
  id?: number
  code: string
  name: string
  description: string
}

export type ReqParamsGroupSalary = {
  search?: string
  page?: number
  size?: number
}

export type ResponseGroupSalary = PageResponse<GroupSalaryDetail[]>
export type ResponseDetailGroupSalary = BaseResponse<GroupSalaryDetail>
