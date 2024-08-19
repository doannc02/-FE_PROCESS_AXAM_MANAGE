import { CommonObject } from '@/service/type'
import { PaymentEntry } from '../getDetail/type'

export type RequestBody = {
  SAVE: {
    id: number | null
    type: string
    code: string
    accountJournal: {
      id: number | null
      code: string
      name: string
    }
    destinationJournalId: number
    paymentMethod: string
    partner: {
      id: number | null
      code: string
      name: string
    } | null
    incomeExpense: {
      id: number | null
      code: string
      name: string
    }
    bankAccount: {
      id: number | null
      code: string
      name: string
    }
    accountingDate: string
    paymentDate: string
    bankAccountPartner: {
      id: number | null
      name: string
    }
    state: 'DRAFT' | 'POSTED'
    partnerType: 'VENDOR' | 'CUSTOMER' | 'INTERNAL'
    paymentType: 'INBOUND' | 'OUTBOUND'
    currency: CommonObject
    isCreateAnotherBook: boolean | null
    isAnotherBook: boolean
    ledgerRefs: {
      accountLedger: {
        id: number | null
        code: string
        name: string
      } | null
      accountJournal: {
        id: number | null
        code: string
        name: string
      } | null
    }[]
    accountLedger: {
      id: number | null
      code: string
      name: string
    }

    paymentEntry: PaymentEntry[]
  }
}
