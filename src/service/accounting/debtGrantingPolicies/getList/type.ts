import { PageResponse } from '@/service/type'

export type DebtPolicy = {
  id: number
  name: string
  partners: string[]
  maximumDebtAmount: number
  timeRepayDebt: number
  timeType: 'YEAR' | 'MONTH' | 'DAYS'
  timeApplyPolicy: string
  timeEndPolicy: string
  amountPunish: number
  status: string
  statusPolicy: string
  isOwner: boolean
  isManager: boolean
}

export type Response = {
  GET: PageResponse<DebtPolicy[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
    timeApplyPolicy?: string | null
    timeEndPolicy?: string | null
  }
}
