import { PageResponse } from '@/service/type'

export type BankAccount = {
  id: number
  bankId: number
  bank: string
  bankBranchId: number
  bankBranch: string
  accountNumber: string
  accountHolder: string
  logoUrl: string
  cloneBankAccountId: number
}

export type ReqGetBankAccountList = {
  tenantId?: number
  isPartner?: boolean
}

export type ResGetBankAccountList = PageResponse<BankAccount[]>
