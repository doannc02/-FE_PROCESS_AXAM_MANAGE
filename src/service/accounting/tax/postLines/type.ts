export type RequestBody = {
  POST: {
    accountInvoiceLineId: number | null
    quantity: number
    unitPrice: number
    taxIds: number[]
    discount: number
  }[]
}
