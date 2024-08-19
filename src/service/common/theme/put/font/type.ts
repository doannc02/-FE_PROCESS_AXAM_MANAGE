import { FontConfig } from '../../get/type'

export type Response = {
  PUT: any
}

export type RequestBody = {
  PUT: {
    companyId: number
    data: FontConfig[]
  }
}
