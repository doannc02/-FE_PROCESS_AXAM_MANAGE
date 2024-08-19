import { PageResponse } from '@/service/type'
import { CashRoundingDetail } from '../getDetail/type'

export type Response = {
  GET: PageResponse<CashRoundingDetail[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
    roundingMethod?: string | null
  }
}
