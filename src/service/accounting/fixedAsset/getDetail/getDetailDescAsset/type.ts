import { BaseResponse } from '@/service/type'

export interface DetailDecreaseAsset {
  decreaseAsset: {
    id: number
    code: string
    accountingDate: string | null
    reason: string
    accountLedger: AccountLedger
    increaseRecordDate: string | null
    lines: Line[] | any
    start?: string
    end?: string
  }
}

export interface AccountLedger {
  id: number | null
  name: string | null
  code: string | null
}

export type Line =
  | {
      id?: number | null
      assetId?: number | null
      product?: Product
      unit?: Unit
      recordedValue?: number
      isTrackDepreciation?: boolean
      periodicAllocation?: number
      accumulatedDepreciation?: number
      remainAmount?: number
      originalPriceAccount?: OriginalPriceAccount
      accountRecordsTheRemainingValue?: AccountRecordsTheRemainingValue
      accountingLines: AccountingLine[]
    }
  | any

export interface Product {
  id: number
  name: string
  sku: string
  uomId: number
  uomName: string
}

export interface Unit {
  id: number
  name: string
}

export interface OriginalPriceAccount {
  id: number
  code: string
  name: string
}

export interface AccountRecordsTheRemainingValue {
  id: number
  code: string
  name: string
}

export interface AccountingLine {
  id: number | null
  sequence: number
  label: string
  accountDebit: AccountDebit
  accountCredit: AccountCredit
  amount: number
}

export interface AccountDebit {
  id: number
  code: string
  name: string
}

export interface AccountCredit {
  id: number
  code: string
  name: string
}

export type RequestParams = {
  GET: { id: number }
}

export type Response = {
  GET: BaseResponse<DetailDecreaseAsset['decreaseAsset']>
}
