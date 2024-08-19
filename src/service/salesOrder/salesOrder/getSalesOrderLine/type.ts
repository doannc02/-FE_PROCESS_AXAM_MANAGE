export interface DeliveryBill {
  id: number
  codeRequestStock: string
  code: string
  sequence: number
  orderId: number
  applyDate: string
  status: string
  saleOrderLine: SaleOrderLine[]
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
export interface Response {
  GET: DeliveryBill[]
}
