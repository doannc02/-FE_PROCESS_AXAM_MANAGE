import { CommonObject } from '@/service/type'

export type RequestBody = {
  SAVE: {
    id?: number | null
    sequence: number
    name: string
    scopeType: string | null
    amount: number
    taxComputeType: string
    type: string
    country: CommonObject
    isIncludedPrice: boolean
    isAffectingBase: boolean
    baseIsAffected: boolean
    description: string
    isActive: boolean
    repartitions?: {
      scopeType: 'SALE' | 'PURCHASE' | 'ALL' | null
      account: CommonObject | null
    }[]
    // taxItems?: {
    //   tax: CommonObject | null
    //   taxComputeType?: string | null
    //   amount?: number | null
    // }[]
  }
}
