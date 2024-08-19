import { BaseResponse, PageResponse } from '@/service/type'

export type SalaryTemplateDetail = {
  id?: number
  code: string
  name: string
  templateType: string
  numberApplicable: string
  description: string
  applicableType: string
}

export type reqGetAllSalaryTemplate = {
  search?: string
  startDate?: string
  templateType?: string
  page?: number
  size?: number
}

export type reqGetAllDepartment = {
  search?: string
  page?: number
  size?: number
}
export type DepartmentDetail = {
  id?: number
  code: string
  name: string
}
export type reqGetAllDStaff = reqGetAllDepartment
export type StaffDetail = DepartmentDetail

export type SalaryTemplateColumns = {
  id?: number
  label?: string
  code?: string
  name?: string
  columnType?: string
  salaryColumn?: SalaryColumn
  groupSalaryColumn?: GroupSalaryColumn
  groupSalaryColumnItems?: GroupSalaryColumnItems[]
}
type SalaryColumn = {
  id?: number
  label?: string
  code: string
  name: string
  columnType: string
}
type GroupSalaryColumn = {
  id: number
  code: string
  name: string
  groupColumnType: string
  description: string
}
type GroupSalaryColumnItems = SalaryColumn

type ApplicableData = SalaryColumn

export type ReqSalaryTemplateAction = {
  id?: number
  code: string
  name: string
  description: string
  templateType: string
  loopType: string
  startDate: string
  applicableType: string
  applicableData: ApplicableData[]
  salaryTemplateColumns: SalaryTemplateColumns[]
}

export type ResponseSalaryTemplateAll = PageResponse<SalaryTemplateDetail[]>
export type ResponseDepartmentAll = PageResponse<DepartmentDetail[]>
export type ResponseStaffAll = PageResponse<StaffDetail[]>
export type ResponseDetailSalaryTemplate = BaseResponse<ReqSalaryTemplateAction>
export type ResponseSalarySystemAll = BaseResponse<SalaryColumn[]>
