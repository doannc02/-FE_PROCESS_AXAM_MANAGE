import { Product } from '@/service/salesOrder/salesOrder/getAllSaleProducts/type'

export interface SalesOrder {
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
  createDate: string
  quoteCreationDate: string
  pricelistId: number
  priceList: PriceList
  paymentTermId: number
  paymentTerm: PaymentTerm
  promotionIds: number[]
  promotions: Promotion[]
  saleUser: User[]
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
  computeTaxInfo: ComputeTaxInfo
  saleOrderLines: SaleOrderLines[]
  scopeType: 'DOMESTICALLY' | 'EXPORTED'
  isPolicyException: boolean // Purchase order exceeds limit
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

export interface SaleOrderLines {
  id: number
  sequence: number
  productId: number
  productInfo: Product
  quantity: number
  quantityInventory: number
  requestedQty: number
  deliveredQty: number
  uomId: number
  orderQty: number
  orderUomId: number | null
  unitPrice: number
  amountUntaxed: number
  amountTotal: number
  taxLines: TaxLines
  taxIds: number[]
  tax: Tax[]
  discount: number
  discountComputeType: string
  type: string
  note: string
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

export interface User {
  firstName: string
  id: number
  lastName: string
}

export interface Tax {
  id: number
  code: string
  name: string
}

export interface Response {
  GET: SalesOrder
}
