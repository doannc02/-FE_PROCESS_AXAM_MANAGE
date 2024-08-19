import { PageResponse } from '@/service/type'

export interface GET {
  id: number
  code: string
  sequence: number
  state: string
  partnerId: number
  partner: Partner
  invoiceAddressId: number
  deliveryAddressId: number
  quotationDate: string
  orderDate: string
  validityDate: string
  quoteCreationDate: string
  pricelistId: number
  priceList: PriceList
  paymentTermId: number
  paymentTerm: PaymentTerm
  promotionIds: number[]
  promotions: Promotion[]
  paymentMethod: string
  deliveryType: string
  commitmentDate: string
  deliveryStatus: string
  campaignId: number
  pickingIds: number[]
  discount: number
  discountComputeType: string
  note: string
  companyId: number
  branchId: number
  deliveryPolicy: string
  totalPrice: number
  type: string
  hasOrderReject: boolean
  computeTaxInfo: ComputeTaxInfo
  saleOrderLineResponses: SaleOrderLineResponse[]
  isValidInventoryQty: boolean
  isSplit: boolean
  invoiceStatusType: 'NO' | 'TO_INVOICE' | 'INVOICED' | 'PARTIAL_INVOICE'
}

export interface ComputeTaxInfo {
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
export interface Partner {
  id: number
  code: string
  name: string
}

export interface PriceList {
  id: number
  code: string
  name: string
}

export interface PaymentTerm {
  id: number
  name: string
}

export interface Promotion {
  id: number
  name: number
}

export interface SaleOrderLineResponse {
  id: number
  sequence: number
  productId: number
  productInfo: ProductInfo
  quantity: number
  quantityInventory: number
  requestedQty: number
  deliveredQty: number
  uomId: number
  unitPrice: number
  amountUntaxed: number
  amountTotal: number
  taxIds: number[]
  tax: Tax[]
  discount: number
  discountComputeType: string
  type: string
  note: string
}

export interface ProductInfo {}

export interface Tax {
  id: number
  code: string
  name: string
}

export type Request = {
  GET: {
    page: number
    size: number
    search?: string
    state?: string
    quotationDate?: string
    orderDate?: string
    validityDate?: string
    partnerId?: number
    isCompleteOrder?: boolean
  }
}

export type Response = {
  GET: PageResponse<Array<GET>>
}
