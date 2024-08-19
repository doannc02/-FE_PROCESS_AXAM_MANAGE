export type Response = {
  DELETE: {}
}

export type RequestBody = {
  DELETE: {
    id: number
    beginType: 'CUSTOMER' | 'VENDOR' | 'BANK'
  }
}
