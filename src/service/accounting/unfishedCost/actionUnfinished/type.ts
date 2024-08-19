import { PageResponse } from '@/service/type'

export interface RootUC {
  id: number
  subjectType: string
  process: Process
  stage: Stage
  product: Product
  contract: Contract
  sale: Sale
  amountMaterial: number
  amountLabor: number
  amountCommon: number
  amountAccepted: number
  amountNotAccepted: number
  amountTotal: number
  stages: Stage2[]
}

export interface Process {
  id: number
  code: string
  name: string
  processCategories: ProcessCategory[]
}

export interface ProcessCategory {
  id: number
  name: string
}

export interface Stage {
  id: number
  name: string
  code: string
}

export interface Product {
  id: number
  name: string
  code: string
}

export interface Contract {
  signDate?: string
  id: number
  name: string
  code: string
}

export interface Sale {
  id: number
  name: string
  orderDate?: string
}

export interface Stage2 {
  stage: Stage3 | null
  amountMaterial?: number
  amountLabor?: number
  amountCommon?: number
  amountAccepted?: number
  amountNotAccepted?: number
  amountTotal?: number
}

export interface Stage3 {
  id: number
  name: string
  code: string
}

export type RequestParamsUC = {
  GET: {
    subjectType?: string
    ids?: [number]
  }
}

export type ResponseUC = {
  GET: {
    data: RootUC[]
  }
}
