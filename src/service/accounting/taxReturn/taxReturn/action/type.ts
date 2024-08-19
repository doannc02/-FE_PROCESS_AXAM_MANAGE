export interface ReqSaveTaxReturn {
  fiscalYearId: number
  taxReturnConfigId: number
  accountLedgerId: number
  declareStart: string
  declareEnd: string
  addendumList: number[]
  isUnArise: boolean
}
