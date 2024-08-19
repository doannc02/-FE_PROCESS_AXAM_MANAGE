export interface Product {
  productId: number
  productResponse: ProductResponse
  totalQuantity: number
}

export interface ProductResponse {
  id: number
  name: string
  sku: string
  upc: string
  uomId: number
  uomCode: string
  uomName: string
  saleUom: {
    uomId: number
    uomName: string
  }
  productTemplateOutputDto: ProductTemplateOutputDto
  uomGroupOutput: UomGroupOutput
  productPrice: number
  cost: number
}

export interface UomGroupOutput {
  id: number
  code: string
  name: string
  originalUnitId: number
  originalUnitOutput: OriginalUnitOutput
  unitGroupLineOutputList: UnitGroupLineOutputList[]
}

export interface OriginalUnitOutput {
  id: number
  code: string
  name: string
  description: string
  activated: boolean
  companyId: number
  branchId: number
  isUsing: boolean
}

export interface UnitGroupLineOutputList {
  accuracy: number
  code: string
  conversionRate: number
  id: number
  isUsing: boolean
  unitGroupId: number
  unitId: number
  unitName: string
  uomLineType: string
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
  attributeCategory: AttributeCategory[]
}

export interface AttributeCategory {
  attributeOutputDtos: AttributeOutputDto[]
}

export interface AttributeOutputDto {
  id: number
  name: string
  productAttributeValue: ProductAttributeValue[]
}

export interface ProductAttributeValue {
  id: number
  value: string
}

export interface Response {
  GET: Array<Product>
}
