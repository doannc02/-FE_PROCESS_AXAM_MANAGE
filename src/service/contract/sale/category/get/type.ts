import { BaseResponse, PageResponse } from '@/service/type'

export interface ContractCategory {
  id: number
  code: string
  name: string
  description: string
  isActive: boolean
}

export type ReqGetContractCategoryList = {
  search?: string
  // partnerId?: number
  // departmentId?: number
  // startDate?: string
  // signDate?: string
  categoryId?: number
  isActive?: boolean
  page: number
  size: number
}

export type ResGetContractCategoryList = PageResponse<ContractCategory[]>

export type ReqGetContractCategoryDetail = {
  id: number
}

export type ResGetContractCategoryDetail = BaseResponse<ContractCategory>
