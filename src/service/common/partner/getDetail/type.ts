import { BaseResponse } from '@/service/type'

export interface Partner {
  id: number
  code: string
  name: string
  avatarUrl: string
  isCompany: boolean
  email: string
  phoneNumber: string
  regionId: number
  region: string
  cityId: number
  city: string
  districtId: number
  district: string
  wardId: number
  ward: string
  address: string
  joinDate: string
  partnerTag: string[]
  partnerTagIds: number[]
  cardId: string
  birth: string
  gender: string
  website: string
  activated: boolean
  addressContacts: AddressContact[]
  bankAccounts: BankAccount[]
  note: string
}

export interface AddressContact {
  id: number
  addressType: string
  name: string
  title: string
  position: string
  address: string
  email: string
  phoneNumber: string
  note: string
  taxCode: string
}

export interface BankAccount {
  id: number
  bankId: number
  bank: string
  bankBranchId: number
  bankBranch: string
  accountNumber: string
  accountHolder: string
}

export type Response = {
  GET: BaseResponse<Partner>
}

export type RequestBody = {
  GET: {
    id: number
  }
}
