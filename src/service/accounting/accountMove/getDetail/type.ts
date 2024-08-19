import { TypePathInvoice } from '@/path'
import { BaseResponse, CommonObject } from '@/service/type'

export interface AccountMoveDetail {
  invoiceFormNumber?: string
  symbol?: string
  codeInvoice?: string
  priceWord: string
  isLocked: boolean
  reference: string
  isCkLedgerRefs?: boolean
  paymentReference: string
  id?: number | null
  code: string
  orderName: string | null
  saleOrderId: number | null
  purchaseOrderId: number | null
  returnPurchaseOrderId: number | null
  returnSaleOrderId: number | null
  partnerShippingId: number
  scopeType:
    | 'DOMESTIC_WAREHOUSE'
    | 'IMPORTED_WITHOUT_WAREHOUSE'
    | 'IMPORTED_WAREHOUSE'
    | 'DOMESTIC_WITHOUT_WAREHOUSE'
    | 'DOMESTICALLY'
    | 'EXPORTED'
  moveType?: string
  paymentStatus: string
  state: 'POSTED' | 'AWAITING_POSTED' | 'DRAFT'
  address: string
  // currencyId: number
  paymentTerm: {
    id: number
    name: string
    hasEarlyDiscount: true
    discountAmount: number
    discountComputeType: string
    withinDays: number
    reducedTaxOnDiscount: true
    description: string
    createdAt: string
    type: string
    lines: {
      id: number | null
      amountDue: number
      computeType: string
      afterDays: number
      anchorDate: string
      paymentTermId: number | null
      date: string
    }[]
  }
  partner: {
    code?: string
    id?: number
    name: string
    label: string
  } | null

  accountJournal: CommonObject
  incomeExpense: CommonObject
  currency: {
    id?: number | null
    currency?: string
  }
  date: string
  dueDate: string | null
  accountingDate: string | null
  accountPaymentId: number | null
  amountUntaxed: number
  discountAmount: number
  totalTax: number
  amountTotal: number
  discount: number | null
  moneyPaid: number
  invoiceLines: InvoiceLine[]
  pickingPurchases: PickingPurchase[]
  pickingSales: PickingSale[]
  moveLines: MoveLine[]
  movePunishes: MovePunishes[]
  moneyBalanceResponses: MoneyBalanceResponse[]
  paymentResponses: PaymentResponse[]
  computeTaxInfo: ComputeTaxInfo
  ledgerRefs: TypeLedgerRefs[]
  accountLedger?: {
    id: number | null
    name: string
    code: string
  }
  isAnotherBook: boolean
  isCreateAnotherBook: boolean | null
  filePDF?: string | null
  deliveryAddress: {
    id: number
    address: string
    cityId: number
    city: string
    districtId: number
    district: string
    wardId: number
    ward: string
    description: string
  }
  invoiceDate?: string
  paymentMethod?: 'BANK' | 'CASH'
  bankAccountPartner: {
    // tài khoản ngân hàng đối tác
    id: number
    code: string
    name: string
    bankId: number
    bank: string
    bankBranchId: number
    bankBranchName: string
    accountNumber: string
    accountHolder: string
  }
  bankAccount: {
    // tài khoản ngân hàng của cty/ chi nhánh
    id: number
    code: string
    name: string
    bankId: number
    bank: string
    bankBranchId: number
    bankBranchName: string
    accountNumber: string
    accountHolder: string
  }
  isWithInvoice: boolean
  isWithDeliveryNote?: boolean // kèm phiếu xuất kho
  isTakePricePolicy?: boolean // đơn giá theo chính sách bảng giá
  priceList?: CommonObject | null
  warehouse: CommonObject | any
  warehouseType: CommonObject | any
  pickingCode?: string
  applyDate?: string
  saleType?: any
}
export interface TypeLedgerRefs {
  accountLedger?: {
    id: number | null
    name: string
    code: string
  } | null
  accountJournal?: {
    id: number | null
    code: string
    name: string
  } | null
}

export interface ComputeTaxInfo {
  taxLines: TaxLine[]
  summaryItems: SummaryItem[]
}

export interface SummaryItem {
  taxId: number
  taxName: string
  amount: number
  amountInTaxEntity: number
  taxComputeType: string
}

export interface Repartition2 {
  id: number
  accountId: number
  accountTagId: number
  amount: number
}

export interface Item2 {
  taxId: number
  taxName: string
  repartitions: Repartition2[]
  amount: number
  amountInTaxEntity: number
  taxComputeType: string
}

export interface TaxLine {
  items: Item2[]
  amount: number
  untaxedAmount: number
  discountAmount: number
}

export interface MovePunishes {
  id: number
  moveType: string
  code: string
  amountTotal: number
  date: string
  paymentStatus: string
  punishRemainAmount: number
  isRejectPunish: boolean
  state: string
  canUndo: boolean
  punishAmountFirst: number
  punishPayments: PunishPayment[]
}

export interface PunishPayment {
  timePayment: string
  amount: number
  currency: string
  isDiscount: boolean
  amountDiscount: number | null
  paymentPopUpResponse: PaymentPopUpResponse
}

export interface PaymentPopUpResponse {
  id: number
  accountPaymentId?: number | null
  amount: number
  accountJournalName: string
  note: string
  paymentDate: string
  accountMoveId: number
  paymentMethodName: string
  moveType: 'ENTRY' | 'OUT_INVOICE' | 'OUT_REFUND' | 'IN_INVOICE' | 'IN_REFUND'
  payType:
    | 'BY_ACCOUNT_MOVE'
    | 'BY_PAYMENT'
    | 'DECLARE_BANK'
    | 'DECLARE_VENDOR'
    | 'DECLARE_CUSTOMER'
  type: 'EXTERNAL' | 'INTERNAL' | null
  saleType:
    | 'INTERNAL'
    | 'EXTERNAL'
    | 'OEM'
    | 'B2B'
    | 'B2C'
    | 'MERCHANT'
    | 'CLEARANCE'
    | 'LIQUIDATION'
  paymentMethod: 'CASH' | 'BANK'
  paymentType: 'INBOUND' | 'OUTBOUND'
  beginType: string
}

export interface PaymentResponse {
  timePayment: string
  amount: number
  currency: string | null
  isDiscount: boolean
  amountDiscount: number | number | number
  paymentPopUpResponse: PaymentPopUpResponse
}

export interface MoneyBalanceResponse {
  accountPaymentId: number
  accountPaymentCode: string
  amount: number
  accountMoveLineId: number
  currencyId: number
  currency: string
  paymentAccountId: number
  paymentLabel: string
  payType: string
}

export interface InvoiceLine {
  lineTax: number
  discountAmount: number
  sequence: number
  product: Product // productInfo lấy từ API bên purchase
  quantity: number // số lượng
  uom: {
    // đơn vị tính
    id: number
    name: string
  } | null
  unitPrice: number
  amountUntaxed: number // tổng tiền chưa thuế trên line
  amountTotal: number // tổng tiền trên 1 line
  discount: number // phần trăm khuyến mãi
  displayType: string // hiển thị ("PRODUCT, NOTE, SECTION") enum
  note: string // ghi chú
  taxIds: number[]
  // id thuế
  taxNames: string[]
  // tên thuế
  accountMoveId: number
  taxInfo: {
    items: {
      taxId: number // id thuế
      taxName: string // tên thuế
      repartitions: {
        id: number
        accountId: number
        accountTagId: number // id thẻ tài khoản
        amount: number // tiền thuế chi tiết
      }[]
      discountAmount: number
      amount: number // tiền thuế
      amountInTaxEntity: number
      taxComputeType: string
    }[]

    amount: number // tổng tiền thuế
    untaxedAmount: number // tiền chưa thuế
  }
  importTax: number // thuế nhập khẩu   (không được bằng null, auto thì truyền number)
  specialConsumptionTax: number // thuế tiêu thụ đặc biệt   (không được bằng null, auto thì truyền number)
  environmentalResourceTax: number //  môi trường  (không được bằng null, auto thì truyền number)
  vat: number // thuế GTGT        (không được bằng null, auto thì truyền number)
  warehouseType: 'FACTORY' | 'SALE' | 'INTERNAL'
  warehouse: {
    id: number
    code: string
    name: string
  }
  taxes?: {
    id: number
    name: string
    amount: number
    taxComputeType: string
  }[]
  // list warehouse, trên figma ở chứng từ mua hàng chọn
}

export interface Product {
  id: number
  name: string
  sku: string
  upc: string
  productImage: string[]
  uomId: number
  uomCode: string
  uomName: string
  minQuantity?: number
  brandName: string
  checkingType: string
  productTemplate: {
    id: number
    hasVariant: true
    sku: string
    upc: string
    name: string
    productCategoryId: number
    productCategoryName: string
    uomId: number
    uomName: string
    managementForm: string
    isInternal: true
    isMaterial: true
    isGoods: true
    isSemiFinished: true
    isOEM: true
  }
  quantity: number
  uomGroup: {
    id: number
    code: string
    name: string
    uomOriginId: number
    uomOriginName: string
    uomGroupLineItems: [
      {
        uomId: number
        uomName: string
        conversionRate: number
        accuracy: number
        uomLineType: string
      }
    ]
  }
  saleUom: {
    id: number
    name: string
  }
  purchaseUom: {
    id: number
    name: string
  }
  brand: {
    id: number
    name: string
  }
  baseProductPackingLine: {
    id: number
    uomId: number
    uomName: string
    uomGroupLineId: number
    productId: number
    amount: number
    uomLineType: string
    length: number
    high: number
    wide: number
    weight: number
    volume: number
  }
  productPackingLines:
    | [
        {
          id: number
          uomId: number
          uomName: string
          uomGroupLineId: number
          productId: number
          amount: number
          uomLineType: string
          length: number
          high: number
          wide: number
          weight: number
          volume: number
        }
      ]
  hasUomGroupInConfig: true
}

export interface Tax {
  id: number
  name: string
  amount: number
  taxComputeType: string
}

export interface MoveLine {
  id: number
  sequence: number
  currencyId: number
  description: string
  partnerId: number
  account: Account
  label: string
  debit: number
  credit: number
  matchingNumber: string
  state: string
  accountTags: CommonObject[]
}

export interface Account {
  id: number
  code: string
  name: string
}

export interface AccountTag {
  id: number
  name: string
  applicability: string
  isNegativeBalance: boolean
}
//--------Response sales or purchase ---------------

export interface PickingPurchase {
  state: 'WAITING' | 'DONE' | 'DONE_PART' | 'REJECTED'
  id: number
  code: string
  name: string
}

export interface ProductInfo {
  id: number
  name: string
  sku: string
  upc: string
  productImage: string[]
  uomId: number
  uomCode: string
  uomName: string
  brandName: string
  checkingType: string
  productTemplate: ProductTemplate
  quantity: number
  uomGroup: UomGroup
  saleUom: SaleUom
  purchaseUom: PurchaseUom
  brand: Brand
  baseProductPackingLine: BaseProductPackingLine
  productPackingLines: ProductPackingLine[]
  hasUomGroupInConfig: boolean
}

export interface ProductTemplate {
  id: number
  hasVariant: boolean
  sku: string
  upc: string
  name: string
  productCategoryId: number
  productCategoryName: string
  uomId: number
  uomName: string
  managementForm: string
  isInternal: boolean
  isMaterial: boolean
  isGoods: boolean
  isSemiFinished: boolean
  isOEM: boolean
}

export interface UomGroup {
  id: number
  code: string
  name: string
  uomOriginId: number
  uomOriginName: string
  uomGroupLineItems: UomGroupLineItem[]
}

export interface UomGroupLineItem {
  uomId: number
  uomName: string
  conversionRate: number
  accuracy: number
  uomLineType: string
}

export interface SaleUom {
  id: number
  name: string
}

export interface PurchaseUom {
  id: number
  name: string
}

export interface Brand {
  id: number
  name: string
}

export interface BaseProductPackingLine {
  id: number
  uomId: number
  uomName: string
  uomGroupLineId: number
  productId: number
  amount: number
  uomLineType: string
  length: number
  high: number
  wide: number
  weight: number
  volume: number
}

export interface ProductPackingLine {
  id: number
  uomId: number
  uomName: string
  uomGroupLineId: number
  productId: number
  amount: number
  uomLineType: string
  length: number
  high: number
  wide: number
  weight: number
  volume: number
}

export interface warehouse {
  id: number
  name: string
}

export interface PickingSale {
  state: 'WAITING' | 'DONE' | 'DONE_PART' | 'REJECTED'
  id: number
  name: string
  code: string
}

export interface ProductInfo2 {
  id: number
  name: string
  sku: string
  upc: string
  productImage: string[]
  uomId: number
  uomCode: string
  uomName: string
  brandName: string
  checkingType: string
  productTemplate: ProductTemplate2
  quantity: number
  uomGroup: UomGroup2
  saleUom: SaleUom2
  purchaseUom: PurchaseUom2
  brand: Brand2
  baseProductPackingLine: BaseProductPackingLine2
  productPackingLines: ProductPackingLine2[]
  hasUomGroupInConfig: boolean
}

export interface ProductTemplate2 {
  id: number
  hasVariant: boolean
  sku: string
  upc: string
  name: string
  productCategoryId: number
  productCategoryName: string
  uomId: number
  uomName: string
  managementForm: string
  isInternal: boolean
  isMaterial: boolean
  isGoods: boolean
  isSemiFinished: boolean
  isOEM: boolean
}

export interface UomGroup2 {
  id: number
  code: string
  name: string
  uomOriginId: number
  uomOriginName: string
  uomGroupLineItems: UomGroupLineItem2[]
}

export interface UomGroupLineItem2 {
  uomId: number
  uomName: string
  conversionRate: number
  accuracy: number
  uomLineType: string
}

export interface SaleUom2 {
  id: number
  name: string
}

export interface PurchaseUom2 {
  id: number
  name: string
}

export interface Brand2 {
  id: number
  name: string
}

export interface BaseProductPackingLine2 {
  id: number
  uomId: number
  uomName: string
  uomGroupLineId: number
  productId: number
  amount: number
  uomLineType: string
  length: number
  high: number
  wide: number
  weight: number
  volume: number
}

export interface ProductPackingLine2 {
  id: number
  uomId: number
  uomName: string
  uomGroupLineId: number
  productId: number
  amount: number
  uomLineType: string
  length: number
  high: number
  wide: number
  weight: number
  volume: number
}

export type RequestParams = {
  GET: {
    id: number
    typePathInv?: 'PROVIDER' | 'CUSTOMER'
    typeSale?: TypePathInvoice | string
    typeInvoice?: string | null
    moveType: string
  }
}

export type Response = {
  GET: BaseResponse<AccountMoveDetail>
}
