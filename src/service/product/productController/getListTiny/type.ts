import { PageResponse } from '@/service/type'
import { UomGroup } from '../getUomGroup/type'

type Product = {
  id: number
  name: string
  sku: string
  upc: string
  uomId: number
  uomCode: string
  uomName: string
  productImage: string[]
  quantityInventory: number
  minQuantity: number
  uomGroup: UomGroup
}

export type ProductV2 = {
  // productInfo lấy từ API bên purchase
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
    uomGroupLineItems: {
      uomId: number
      uomName: string
      conversionRate: number
      accuracy: number
      uomLineType: string
    }[]
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
  productPackingLines: {
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
  }[]
  hasUomGroupInConfig: true
}

export type Response = {
  GET: PageResponse<Product[]>
  GETV2: PageResponse<ProductV2[]>
}

export type RequestBody = {
  GET: {
    search?: number
    page: number
    size: number
    purchaseOk?: boolean
    vendorId?: number
  }
}
