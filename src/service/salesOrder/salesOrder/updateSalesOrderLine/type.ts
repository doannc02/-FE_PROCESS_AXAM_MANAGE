export interface Root {
  id: number
  code: string
  codeRequestStock: string
  applyDate: string
  saleOrderLine: SaleOrderLine[]
  type: string
  status: string
  pickingIds: number[]
}

export interface ProductInfo {
  id: number
  name: string
  sku: string
  upc: string
  uomCode: string
  uomName: string
  imageUrls: string[]
  productTemplateOutputDto: ProductTemplateOutputDto
  productPrice: number
  cost: number
  quantity: number
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

export interface SaleOrderLine {
  id: number
  saleOrderLineId: number
  sequence: number
  productId: number
  productInfo: ProductInfo
  quantityReq: number
  quantity: number
  requestedQty: number
}

export interface Request {
  PUT: Root
}
