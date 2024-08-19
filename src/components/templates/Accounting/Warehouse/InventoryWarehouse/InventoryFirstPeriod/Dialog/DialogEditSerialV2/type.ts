export interface SerialLotLine {
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
  serialChildren?: SerialLotLine[]
}

export type RequestBody = {
  POST: {
    serialLotLines: {
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
      serialChildren?: SerialLotLine[]
    }[]
  }
}
