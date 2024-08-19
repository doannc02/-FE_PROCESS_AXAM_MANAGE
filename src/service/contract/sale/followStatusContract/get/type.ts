import { BaseResponse, CommonObject, PageResponse } from '@/service/type'

export interface SaleContractProgress {
  contract: CommonObject
  startDate: string
  endDate: string
  progress: CommonObject[]
  paymentStages: (CommonObject & { state: string })[]
}

export interface SaleContractProgressDetail {
  contract: null | {
    id: string | null
    code: string
    name: string
    startDate: string
    endDate: string
  }
  includeType: string
  formType: string
  contractProgressLines: ContractProgressLine[]
}

export interface ContractProgressLine {
  id?: number
  name: string
  startDate: string
  endDate: string
  total: number
  productItems: ProductItem[]
  contractPaymentStages: ContractPaymentStage[]
}

export interface ProductItem {
  id: number
  priceList: CommonObject | null
  product: CommonObject | null
  currency: CommonObject | null
  uom: CommonObject | null
  minQuantity: number
  quantity: number
  unitPrice: number
  price: number
}

export interface ContractPaymentStage {
  id: number
  name: string
  amount: number
  expiredDate: string
  computeType: string
  paymentTerm: CommonObject
}

export type ReqGetSaleContractProgressList = {
  search?: string
  page: number
  size: number
}

export type ResGetSaleContractProgressList = PageResponse<
  SaleContractProgress[]
>

export type ReqGetSaleContractProgressDetail = {
  contractId: number
}

export type ResGetSaleContractProgressDetail =
  BaseResponse<SaleContractProgressDetail>
