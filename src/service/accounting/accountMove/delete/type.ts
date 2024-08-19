export type Response = {
  DELETE: {}
}

export type RequestBody = {
  DELETE: {
    id: number
    typePath?: 'PROVIDER'
    typeInvoice?: string | null
  }
}
