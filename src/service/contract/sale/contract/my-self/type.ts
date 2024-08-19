import { CommonObject, PageResponse } from '@/service/type'

export interface SaleContract {
  id: number
  code: string
  name: string
  partner: CommonObject
  department: CommonObject
  category: CommonObject
  currency: CommonObject
  amount: number
  signDate: string
  startDate: string
  endDate: string
  numAddendum: number
  state: string
  actionType: string
  paymentState: string
  approveState: string
  approveBy: CommonObject
}

export type ReqGetSaleContractList = {
  search?: string
  partnerId?: number
  categoryId?: number
  departmentId?: number
  partner?: CommonObject
  category?: CommonObject
  department?: CommonObject
  page: number
  size: number
}

export type ResGetSaleContractList = PageResponse<SaleContract[]>
