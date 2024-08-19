export type RequestBody = {
  GET: {
    partnerId: number
  }
  PUT: {
    id?: number
    code?: string
    name: string
    description?: string
    activated?: boolean
    isCustomer?: boolean
  }
}

export type Response = {
  PUT: any
  GET: {
    id?: number
    code?: string
    name: string
    description?: string
    activated?: boolean
  }
}
