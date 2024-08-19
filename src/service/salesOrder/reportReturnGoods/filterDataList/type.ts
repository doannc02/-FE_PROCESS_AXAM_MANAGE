export type Warehouse = {
  warehouseId: number
  warehouseName: string
}

export type UOM = {
  uomId: number
  uomCode: string
  uomName: string
}

export type SKU = {
  productId: number
  sku: string
}

export type Category = {
  productCategoryId: number
  name: string
}

export type Customer = {
  customerId: number
  customerName: string
}

export type Code = {
  id: number
  code: string
}

export type Response = {
  WAREHOUSE: Array<Warehouse>
  UOM: Array<UOM>
  SKU: Array<SKU>
  CATEGORY: Array<Category>
  CUSTOMER: Array<Customer>
  CODE: Array<Code>
}
