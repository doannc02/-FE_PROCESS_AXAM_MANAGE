export type Response = {
  id: number
  companyId: number
  branchId: number
  saleUserRole: {
    id: number
    name: string
    alias: string
  }
  saleManagerRole: {
    id: number
    name: string
    alias: string
  }
  saleManagerRoleId: number
  saleUserRoleId: number
  warehouse: {
    id: number
    name: string
  }
  defaultWarehouse: {
    id: number
    name: string
  }
  warehouseIds: Array<number>
  defaultWarehouseId: number
  approvalAuthority: boolean
  isSignature: boolean
}

export type Request = {
  GET: any
}
