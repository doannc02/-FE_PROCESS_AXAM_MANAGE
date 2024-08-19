export type RequestBody = {
  POST: {
    serialLotLines: {
      id: number | null
      serialLots: {
        id: number | null
        code: string
      }
      quantity: number
      receiveDate: string
      unitPrice: number
      intoMoney: number
    }[]
  }
}
