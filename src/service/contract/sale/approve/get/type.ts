import { BaseResponse, PageResponse } from '@/service/type'
import { SaleContract } from '../../contract/get/type'

export type ContractApprove = SaleContract

export type ReqGetContractApproveList = {
  search?: string
  partnerId?: number
  departmentId?: number
  startDate?: string
  signDate?: string
  categoryId?: number
  page: number
  size: number
}

export type ResGetContractApproveList = PageResponse<ContractApprove[]>

export type ReqGetContractApproveDetail = {
  id: number
}

export type ResGetContractApproveDetail = BaseResponse<ContractApprove>
