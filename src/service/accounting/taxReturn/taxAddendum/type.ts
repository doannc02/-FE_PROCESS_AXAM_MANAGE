import { BaseResponse } from '@/service/type'

export interface TaxReturnAddendum {
  id: number
  code: string
  name: string
}

export type Response = {
  GET: BaseResponse<TaxReturnAddendum[]>
}

export type RequestBody = {
  GET: {
    addendumType?: string
  }
}
