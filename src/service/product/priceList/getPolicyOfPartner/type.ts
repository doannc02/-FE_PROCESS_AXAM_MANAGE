export interface PolicyPartner {
  id: number
  code: string
  name: string
  currency: {
    id: number
    name: string
  }
  isHasPolicy: boolean
  priceList: PriceList
}

export interface PriceList {
  id: number
  code: string
  name: string
}

export interface Request {
  PARAMS: {
    partnerId?: number
  }
}

export interface Response {
  GET: PolicyPartner | any
}
