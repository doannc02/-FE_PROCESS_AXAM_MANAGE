import { CommonObject } from '@/service/type'

export interface SaveTaxReturn {
  id: number
  taxReturnConfig: CommonObject
  value01a: string
  value01b: string
  value03: string
  value04: string
  value05: string
  value06: string
  value07: string
  value08: string
  value09: string
  value10: string
  value11a: CommonObject | null
  value11b: CommonObject | null
  value11c: CommonObject | null
  taxStaffName: string
  signerName: string
  numberCertificate: string
  signDate: string
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

  valueParam: any
  valueDecimal: any
}
