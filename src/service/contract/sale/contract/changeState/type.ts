import { CommonObject } from '@/service/type'
import { SaleContract } from '../get/type'

export type RequestBodySaveSaleContract = SaleContract & {
  contractImages: { id?: number | null; name: string; url: string }[]
  addendumImages: { id?: number | null; name: string; url: string }[]
  isRule: boolean

  debtGrantingPolicy?:
    | null
    | (CommonObject & {
        maximumDebtAmount?: number
        timeRepayDebt?: number
        timeType?: string
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
        maximumDebtAmountAndCurrency?: string
        timeLimit?: string
      })
}
