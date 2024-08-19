import { Product } from '@/service/salesOrder/salesOrder/getAllSaleProducts/type'
export interface POST {
  code: string
  sequence: number
  state: string
  createAt: string
  currencyId: number
  quoteCreationDate: string
  partnerId: number
  invoiceAddressId: number
  deliveryAddressId: number
  quotationDate: string
  holdDate: any
  orderDate: string
  validityDate: string
  pricelistId: number
  paymentTermId: number | null
  promotionIds: number[]
  paymentMethod: string
  salePersonIds: number[]
  saleUserIds: number[]
  numberOrder?: number
  deliveryType: string
  commitmentDate: string
  deliveryStatus: string
  deliveryPolicy: string
  campaignId: number
  pickingIds: number[]
  discount: number
  discountComputeType: string
  note: string
  warehouseId?: number
  titleValue?: string
  totalPrice: number
  expireHoldDate: string
  computeTaxInfo: ComputeTaxInfo
  saleOrderLines: SaleOrderLines[]
  saleOrderLineDeleteIds: number[]
  scopeType: 'DOMESTICALLY' | 'EXPORTED'
  isOptionPrice: boolean
  isPolicyException: boolean // Purchase order exceeds limit
  // temp
  namePolicy?: string
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

export interface SaleOrderLines {
  id?: number
  sequence?: number
  productId: number
  productInfo: Product | null
  quantity: number
  uomId: number | null
  orderQty: number
  orderUomId: number | null
  unitPrice: number
  amountUntaxed: number
  amountTotal: number
  quantityInventory: number
  taxIds: number[]
  taxLines?: TaxLines
  discount?: number
  discountComputeType?: string
  type: string
  note?: string
  remainInvoiceQty: number // remaining quantity can generate invoice
  isPriceChange: boolean // Product prices are taken from the price list and cannot be edited
}

export interface TaxLines {
  items: Item[]
  amount: number
  untaxedAmount: number
}

export interface Item {
  taxId: number
  taxName: string
  amount: number
}

export type RequestBody = {
  POST: POST
}
