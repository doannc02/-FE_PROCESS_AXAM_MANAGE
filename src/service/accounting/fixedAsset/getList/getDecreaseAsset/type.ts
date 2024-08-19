import { PageResponse } from '@/service/type'

type DecreaseAssetItem = {
  id: number
  accountingDate: string
  code: string
  increaseRecordDate: string
  reason: string
}
export type Response = {
  GET: PageResponse<DecreaseAssetItem[]>
}

export type RequestBody = {
  GET: {
    type?: 'ASSET' | 'TOOLS'
    toolsAsset: 'ASSET' | 'TOOLS'
    increaseType: 'INCREASE' | 'DECREASE'
    search?: string | null
    page: number
    size: number
    accountLedgerId: number
    start?: string
    end?: string
  }
}
