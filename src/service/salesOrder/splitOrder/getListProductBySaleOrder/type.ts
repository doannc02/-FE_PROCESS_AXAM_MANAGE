export interface LineResponse {
  productInfo: ProductInfo
  quantity: number
  unitPrice: number
  splitQtyValid: number
  splitQty: number
  discount: number
  taxIds: number[]
  tax: Tax[]
  requestCode: string
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

export interface Tax {
  id: number
  code: string
  name: string
}

export interface Response {
  GET: Array<LineResponse>
}

export interface Request {
  GET: {
    orderId: number | null
  }
}
