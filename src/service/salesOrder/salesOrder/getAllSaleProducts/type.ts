import { PageResponse } from '@/service/type'

export interface Product {
  id: number
  name: string
  sku: string
  upc: string
  uomId: number
  uomCode: string
  uomName: string
  productImage: string[]
  productTemplate: ProductTemplate
  quantityInventory: number
  minQuantity: number
  uomGroup: UomGroup
  baseProductPackingLine: BaseProductPackingLine
  productPackingLines: ProductPackingLine[]
  saleUom: SaleUom
  brand: Brand
  warehouse: warehouse
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
  id: number
  uomId: number
  uomName: string
  conversionRate: number
  accuracy: number
  uomLineType: string
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

export interface SaleUom {
  id: number
  name: string
}

export interface Brand {
  id: number
  name: string
}

export interface warehouse {
  id: number
  name: string
  quantity: number
}

export interface ResponseProduct {
  GET: PageResponse<Product[]>
}
