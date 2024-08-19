import { PageResponse } from '@/service/type'
import { LineDecreasedTool } from '../../getDetail/getDecrease/type'

export type Response = {
  GET: PageResponse<LineDecreasedTool[]>
}

export type RequestBody = {
  GET: {
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
