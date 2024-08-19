export interface POST {
  orderLines: OrderLine[]
}

export interface OrderLine {
  id?: number
  productId: number
  productInfo: ProductInfo
  quantity: number
  uomId: number
  orderQty: number
  orderUomId: number
  unitPrice: number
  amountUntaxed: number
  amountTotal: number
  taxIds: number[]
  discount: number
  discountComputeType: string
  type: string
  note: string
  key: string // to develop
  requestCode: string // to develop
}

export interface ProductInfo {
  id: number
  name: string
  sku: string
  upc: string
  uomCode: string
  uomName: string
  productTemplateOutputDto: ProductTemplateOutputDto
  productPrice: number
  cost: number
  quantity: number
  uomId: number
  uomGroupOutput: UomGroupOutput
  saleUom: SaleUom
  purchaseUom: PurchaseUom
  baseProductPackingLineOutput: BaseProductPackingLineOutput
  productPackingLineOutputList: ProductPackingLineOutputList[]
}

export interface ProductTemplateOutputDto {
  id: number
  hasVariant: boolean
  sku: string
  upc: string
  name: string
  productCategoryId: number
  productCategoryName: string
  uomCode: string
  managementForm: string
  cost: number
}

export interface UomGroupOutput {
  id: number
  code: string
  name: string
  originalUnitId: number
  originalUnitOutput: OriginalUnitOutput
  description: string
  activated: boolean
  companyId: number
  branchId: number
  unitGroupLineOutputList: UnitGroupLineOutputList[]
  isUsing: boolean
  unitGroupLineOutputContainOriginalList: UnitGroupLineOutputContainOriginalList[]
}

export interface OriginalUnitOutput {
  id: number
  code: string
  name: string
  description: string
  activated: boolean
  unitGroupOutputList: UnitGroupOutputList[]
  companyId: number
  branchId: number
  isUsing: boolean
}

export interface UnitGroupOutputList {
  id: number
  code: string
  name: string
  originalUnitId: number
  description: string
  activated: boolean
  companyId: number
  branchId: number
}

export interface UnitGroupLineOutputList {
  id: number
  code: string
  unitId: number
  unitGroupId: number
  unitName: string
  conversionRate: number
  accuracy: number
  uomLineType: string
  isUsing: boolean
}

export interface UnitGroupLineOutputContainOriginalList {
  id: number
  code: string
  unitId: number
  unitGroupId: number
  unitName: string
  conversionRate: number
  accuracy: number
  uomLineType: string
  isUsing: boolean
}

export interface SaleUom {
  uomId: number
  uomName: string
}

export interface PurchaseUom {
  uomId: number
  uomName: string
}

export interface BaseProductPackingLineOutput {
  id: number
  uomGroupLineId: number
  productId: number
  amount: number
  uomLineType: string
  length: number
  high: number
  wide: number
  weight: number
}

export interface ProductPackingLineOutputList {
  id: number
  uomGroupLineId: number
  productId: number
  amount: number
  uomLineType: string
  length: number
  high: number
  wide: number
  weight: number
}

export type Request = {
  POST: POST[]
  PARAMS: {
    orderId: number
  }
}
