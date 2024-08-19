export interface POST {
  productCategoryId: number
  productTemplateId: number
  productId: number
  priceListId: number
  quantity: number
}

export interface RequestBody {
  POST: POST
  TYPE_PATH: 'MERCHANT' | 'B2B' | 'B2C'
}

export interface Response {
  POST: {
    oductId: number
    quantity: number
    price: number
  }
}
