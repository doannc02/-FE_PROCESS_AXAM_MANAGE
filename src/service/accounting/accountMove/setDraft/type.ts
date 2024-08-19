export type RequestBody = {
  PUT: {
    id: number
    reason: string
    typePath?: 'PROVIDER'
    typeInvoice?: string | null
  }
}

export type Response = {
  PUT: {}
}
