import { BaseResponse, CommonObject } from '@/service/type'

export interface TaxReturnDetailRes {
  id: number
  addendumList: AddendumList[]
  valueParam: ValueParam
  valueDecimal: ValueParam
  value11a: CommonObject
  value11b: CommonObject
  value11c: CommonObject
  taxStaffName: string
  signerName: string
  numberCertificate: string
  state: string
  time: string
  declareStart: string
  declareEnd: string
  signDate: string
}

export interface AddendumList {
  id: number
  code: string
  name: string
  addendumType: 'SO' | 'PO'
  taxAddendumTypeResponses: TaxAddendumTypeResponse[]
}

export interface TaxAddendumTypeResponse {
  type: string
  amountUntaxedTotal: number
  amountTaxTotal: number
  taxAddendumLineResponses: TaxAddendumLineResponse[]
}

export interface TaxAddendumLineResponse {
  type: string
  numberInvoice: string
  invoiceDate: string
  customerName: string
  amountUntaxed: number
  amountTax: number
}

export interface ValueParam {
  value01b: string
  value06: string
  value07: string
  value08: string
  value09: string
  value10: string
  value11a: CommonObject | null
  value11b: CommonObject | null
  value11c: CommonObject | null

  value32a: number
  value35: number
  value34a: number
  value36: number
  value37: number
  value38: number
  value39a: number
  value40a: number
  value40b: number
  value40: number
  value41: number
  value42a: number
  value42b: number
  value43: number
  state: string

  value33a: number
  value31: number
  value30: number
  value33: number
  value32: number
  value23a: number
  value34: number
  value42: number
  value29: number
  value26: number
  value25: number
  value28: number
  value27: number
  value22: number
  value21: number
  value24: number
  value23: number
  value24a: number
}

export type Response = {
  GET: BaseResponse<TaxReturnDetailRes>
}

export type RequestBody = {
  GET: {
    id: number
  }
}
