import { BaseResponse, PageResponse } from '@/service/type'
import { GroupSalaryDetail } from '../../SalaryGroup/get/type'

export type ReqParamsSalaryColumn = {
  id?: number
  groupSalaryColumnId?: number
  groupSalaryColumn?: GroupSalaryDetail
  paramType?:string
  search?: string
  page?: number
  size?: number
}

export type SalaryColumnDetail = {
  id?: number
  groupSalaryColumn: GroupSalaryDetail
  code: string
  name: string
  columnType: string
  incomeType: string
}
export type ResponseSalaryColumnAll = PageResponse<SalaryColumnDetail[]>
export type ResponseSalaryColumnDetail = BaseResponse<SalaryColumnDetail>
