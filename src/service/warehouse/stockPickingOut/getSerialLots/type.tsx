export type RequestBody = {
  GET: {
    code?: string
    locationId?: number
    productId?: number
    quantityInventory?: number
    manufactureSteps?: string
    warehouseId?: any[]
  }
}
export type Response = {
  GET: {
    lotId: number
    code: string
    quantity: number
    locationId?: number
    productId?: number
    quantityInventory?: number
    manufactureSteps?: string
  }[]
}
