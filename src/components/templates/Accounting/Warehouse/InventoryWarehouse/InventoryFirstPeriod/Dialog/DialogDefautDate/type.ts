export type RequestBody = {
  POST: {
    id: number | null
    serialLots: {
      id: number | null
      code: string
    }
    quantity: number | null
    receiveDate: string
    unitPrice: number
    intoMoney: number
  }
}
