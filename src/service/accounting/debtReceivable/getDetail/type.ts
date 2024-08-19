import { PageResponse } from '@/service/type'

export type DebtPaidLine = {
  id: number | null
  partner: {
    id: number
    name: string
    code: string
  }
  accountMoveId: number
  accountPaymentId: number
  moveType: 'ENTRY' | 'OUT_INVOICE' | 'OUT_REFUND' | 'IN_INVOICE' | 'IN_REFUND'
  payType:
    | 'BY_ACCOUNT_MOVE'
    | 'BY_PAYMENT'
    | 'DECLARE_BANK'
    | 'DECLARE_VENDOR'
    | 'DECLARE_CUSTOMER'
  paymentMethod: 'CASH' | 'BANK'
  paymentType: 'INBOUND' | 'OUTBOUND'
  type: 'EXTERNAL' | 'INTERNAL' | 'STAFF' | null
  saleType:
    | 'INTERNAL'
    | 'EXTERNAL'
    | 'OEM'
    | 'B2B'
    | 'B2C'
    | 'MERCHANT'
    | 'CLEARANCE'
    | 'LIQUIDATION'
  orderCode: string
  dateOrder: string
  code: string
  accountingDate: string
  codeAccount: string
  codeReciprocalAccount: string
  note: string
  arise: {
    debit: number
    credit: number
  }
  balance: {
    debit: number
    credit: number
  }
}

export type Response = {
  GET: PageResponse<DebtPaidLine[]>
}

export type RequestBody = {
  GET: {
    typeDebt?: string
    page: number
    size: number
    type: 'INTERNAL' | 'EXTERNAL' | 'STAFF'
    partnerId?: number | null
    accountId: number
    start: string
    end: string
    accountLedgerId: number | null
  }
}
