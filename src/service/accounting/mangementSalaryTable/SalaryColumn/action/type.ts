import { BaseResponse, PageResponse } from '@/service/type'
import { GroupSalaryDetail } from '../../SalaryGroup/get/type'

export type ReqSalaryColumnDetail = {
  groupSalaryColumn: GroupSalaryDetail
  code: string
  name: string
  columnType: string
  incomeType: string
}

export type ResponseSalaryColumn = BaseResponse<GroupSalaryDetail>
