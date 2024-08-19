import { BaseResponse } from '@/service/type'

export type TotalDebt = {
  openBalance: {
    debit: number
    credit: number
  }
  arise: {
    debit: number
    credit: number
  }
  endingBalance: {
    debit: number
    credit: number
  }
}

export type TotalDebtNew = {
  type: 'INTERNAL' | 'EXTERNAL' | 'BANK' | 'STAFF'
  account: {
    id: number
    name: string
    code: string
  }
  openBalance: {
    debit: number
    credit: number
  }
  arise: {
    debit: number
    credit: number
  }
  endingBalance: {
    debit: number
    credit: number
  }
}

/// --- 3 tab Nhân viên, Nội bộ, khách hàng dùng chung kiểu này
export type TotalNormalTab = {
  id: number
  partnerResponse: {
    id: number
    code: string
    name: string
    country: string
    region: string
    city: string
    district: string
    ward: string
    address: string
    fullName: string
    phoneNumber: string
  }
  account: {
    id: number
    code: string
    name: string
  }
  openBalance: {
    debit: number
    credit: number
  }
  arise: {
    debit: number
    credit: number
  }
  endingBalance: {
    debit: number
    credit: number
  }
}

export type Response = {
  GET: BaseResponse<TotalDebt>
  GET_DEBT: BaseResponse<TotalDebtNew>
  GET_NORMAL_TAB: BaseResponse<TotalNormalTab>
}

export type RequestBody = {
  GET: {
    customerId?: number | null
    start: string
    end: string
  }
  GET_DEBT: {
    partnerId?: number
    typeDebt?: string
    start?: string
    end?: string
    page: number
    size: number
    accountLedgerId: number
    type: 'INTERNAL' | 'EXTERNAL' | 'BANK' | 'STAFF'
    accountId?: number
    isReceiveDebt?: boolean
  }
}
