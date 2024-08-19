export type RequestBody = {
  SAVE: {
    id: number | null
    name: string
    partnerIds: number[]
    maximumDebtAmount: number
    timeRepayDebt: number
    timeType: string
    paymentTermId: number
    timeApplyPolicy: string
    timeEndPolicy: string
    status: 'DRAFT' | 'PENDING_APPROVAL' | 'UPCOMING' | 'POSTED' | 'ARCHIVED'
    statusPolicy: 'DRAFT' | 'AWAITING' | 'APPROVE' | 'REJECT'
    policyLines: {
      id?: number | null
      deferredPaymentPeriod: number
      timeTypeDeferredPaymentPeriod: string
      punish: number
    }[]
  }
}
