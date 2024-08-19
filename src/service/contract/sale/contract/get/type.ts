import { BaseResponse, CommonObject, PageResponse } from '@/service/type'

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
  entityName: string
  isRule: boolean
  contractImages: { id?: number | null; name: string; url: string }[]
  addendumImages: { id?: number | null; name: string; url: string }[]
  debtGrantingPolicy?:
    | null
    | (CommonObject & {
        maximumDebtAmount?: number
        currency?: CommonObject
        timeRepayDebt?: number
        timeType?: string

        //timeRepayDebtAndTime
        timeRepayDebtAndTime: string
        // maximumDebtAmountAndCurrency
        maximumDebtAmountAndCurrency?: string

        paymentTermId?: number
        timeApplyPolicy?: string
        timeEndPolicy?: string
        policyLines?: {
          id?: number | null
          deferredPaymentPeriod?: number
          timeTypeDeferredPaymentPeriod?: string
          punish?: number
        }[]
        paymentTerm?: string

        timeLimit?: string
      })
}

export type ReqGetSaleContractList = {
  search?: string
  partnerId?: number
  categoryId?: number
  departmentId?: number
  partner?: CommonObject
  category?: CommonObject
  department?: CommonObject
  isConfig?: boolean
  isRule?: boolean
  page: number
  size: number
}

export type ResGetSaleContractList = PageResponse<SaleContract[]>

export type ReqGetSaleContractDetail = {
  id: number
}

export type ResGetSaleContractDetail = BaseResponse<SaleContract>
