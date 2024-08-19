export type RequestBody = {
  POST: {
    code?: string
    name: string
    description?: string
    activated?: boolean
    isCustomer?: boolean
  }
}

export type Response = {
  POST: any
}
