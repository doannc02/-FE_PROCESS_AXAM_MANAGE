export interface POST {
  quantity: number
  unitPrice: number
  discount: number
  taxIds: number[]
}

export interface ResponseComputeTax {
  taxLines: TaxLine[]
  summaryItems: SummaryItem[]
}

export interface TaxLine {
  items: Item[]
  amount: number
  untaxedAmount: number
}

export interface Item {
  taxId: number
  taxName: string
  amount: number
}

export interface SummaryItem {
  taxId: number
  taxName: string
  amount: number
}

export interface Response {
  POST: ResponseComputeTax
}

export interface RequestBody {
  POST: POST[]
}
