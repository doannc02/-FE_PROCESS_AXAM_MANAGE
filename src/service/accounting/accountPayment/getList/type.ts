import { CommonObject, PageResponse } from '@/service/type'

export interface Payment {
  id: number
  code: string
  accountJournal: {
    id: number
    code: string
    name: string
  }
  amount: number
  equalAmount: number
  state: string
  paymentMethod: string
  incomeExpense: {
    id: number
    code: string
    name: string
  }
  partner: {
    id: number
    code: string
    name: string
  }
  paymentDate: string
  note: string
  paymentsEntry: number
  amountSource: number
  currency: {
    id: number
    name: string
  }
  currencySourceId: number
  currencySource: string
}

export type Response = {
  GET: PageResponse<Payment[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
    state?: 'DRAFT' | 'POSTED' | 'CANCELED' | null
    partner: CommonObject
    partnerId?: number | null
    partnerType: 'VENDOR' | 'CUSTOMER'
    paymentType: 'INBOUND' | 'OUTBOUND'
    paymentMethod: 'CASH' | 'BANK'
  }
}
