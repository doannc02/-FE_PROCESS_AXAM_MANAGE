export interface SerialLotLine {
  serialChildren: any[]
  id: number
  serialLots: {
    id: number
    code: string
  }
  quantity: number
  receiveDate: string
  unitPrice: number
  intoMoney: number
  parent: {
    lotSerialId: number
    lotSerialCode: string
  }
  disable?: boolean
  product: {
    id: number
    name: string
  }
  name: string
}

export type RequestBody = {
  POST: {
    serialLotLines: {
      // id: number | null
      // lotId: number | null
      // lotType: string | null
      // quantity: number
      // lotCode: string
      // name?: any
      // parentLotId?: number
      // parentSerialLotCode?: string
      // disable?: boolean
      // productId?: number
      id: number
      serialLots: {
        id: number
        code: string
      }
      quantity: number
      receiveDate: string
      unitPrice: number
      intoMoney: number
      parent: {
        lotSerialId: number
        lotSerialCode: string
      }
      product: {
        id: number
        name: string
      }
      name: string
      disable?: boolean
      serialChildren?: SerialLotLine[]
    }[]
  }
}
