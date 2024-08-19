export interface StockPickingLine {
  // id: number
  // fromLocationId: number
  // toLocationId: number
  // destinationType: string
  // productId: number
  // productManagementForm: string
  // lotId: number
  // demandQty: number
  // doneQty: number
  // uomCode: string
  // serialLotLines: SerialLotLine[]
  // serialLotLineDeleteIds: number[]
  id?: number | null
  product: {
    id: number
    sku: string
    name: string
    upc: string
    uom: {
      id: number
      name: string
    }
    checkingType: string
  }
  productId?: number | null
  uomId?: number | null
  productManagementForm: string
  toLocation: {
    id: number
    name: string
  } | null
  destinationType: string
  demandQty: number
  doneQty: number
  isOpacity: boolean
  sumMoney: number
  serialLotLines: SerialLotLine[]
  serialLotLineDeleteIds: number[]
}

export interface SerialLotLine {
  // id: number
  // lotId: number
  // lotType: string
  // quantity: number
  // lotCode: string
  // parentSerialLotCode: string
  // parentLotId: number
  // productId: number
  id: number
  serialLots: {
    id: number
    code: string
  }
  quantity: number
  receiveDate: string
  unitPrice: number
  intoMoney: number
}

export type RequestBody = {
  POST: {
    // id: number | null
    // scheduledDate: string
    // pickingType: string
    // orderType: string
    // sourceDocument: string
    // employeeId: number
    // warehouseId: number
    // note: string
    // stockPickingLines: StockPickingLine[]
    // pickingLineDeleteIds: number[]
    // pickingTypeId: number
    // doneDate: string
    // imageUrls: string[]
    id?: number | null
    warehouseId: number | null
    warehouse: {
      id: number
      name: string
    }
    sourceDocument: string
    pickingType: {
      id: number
      name: string
    }
    employee: {
      id: number
      name: string
    }
    note: string
    sourceProductType: string
    stockPickingLines: StockPickingLine[]
    pickingLineDeleteIds: number[]
  }
}
