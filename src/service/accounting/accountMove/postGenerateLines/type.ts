import { BaseResponse } from '@/service/type'

import { InvoiceLine, MoveLine, SummaryItem, TaxLine } from '../getDetail/type'

export interface Root {
  taxLines: TaxLine[]
  summaryItems: SummaryItem[]
  moveLines?: MoveLine[]
}

export type RequestBody = {
  POST: {
    scopeType?: string
    partnerName?: string
    type?: string
    moveType: string
    accountJournalId?: number | null
    data: InvoiceLine[]
  }
}

export type Response = {
  POST: BaseResponse<Root>
}
