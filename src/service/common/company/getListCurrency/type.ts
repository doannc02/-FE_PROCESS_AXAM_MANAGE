import { PageResponse } from '@/service/type'

interface Currency {
  id: number
  createdAt: string
  name: string
  symbol: string
  fullName: string
  position: string
  isMainCurrency: boolean
  currencyMin: string
  activated: boolean
  updatedAt: string
}

export type Response = {
  GET: PageResponse<Currency[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
  }
}
