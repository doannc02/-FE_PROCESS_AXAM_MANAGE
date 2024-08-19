import { PageResponse } from '@/service/type'

export type DebtPaid = {
  id: number
  code: string
  name: string
  codeAccount: string

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

export type DebtSynthetic = {
  type: 'INTERNAL' | 'EXTERNAL' | 'BANK' | 'STAFF'
  accountDebts: [
    {
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
  ]
}

//--- 3 tab Nhân viên, Khách hàng, nội bộ dùng chung kiểu trả về này ----

export type NormalTab = {
  type?: 'EXTERNAL' | 'INTERNAL' | 'STAFF' | 'BANK'
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
  debts: {
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
      id: 1
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
  }[]
}[]

export type Response = {
  GET: PageResponse<DebtPaid[]>
  GET_DEBT: PageResponse<DebtSynthetic[]>
  GET_NORMAL_TAB: PageResponse<NormalTab[]>
}

export type RequestBody = {
  GET: {
    tabNumber?: number
    typeQueryTab?: string
    page: number
    type: string | null
    size: number
    customer: {
      id: number
      name: string
    }
    customerId?: number | null
    start: string
    end: string
    accountLedgerId: number | null
  }
  GET_DEBT: {
    partner?: null | any
    typeDebt?: string
    tabNumber?: number
    typeQueryTab?: string
    partnerId?: number
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
