export type RequestBody = {
  POST: {
    saleUserRoleId: number
    saleManagerRoleId: number
    defaultWarehouseId: number | null
    isMultipleWarehouse: boolean
  }
}

export type Response = {
  POST: any
}
