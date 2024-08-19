import { BaseResponse, PageResponse } from '@/service/type'

export type Response = {
  GET: BaseResponse<{
    id: number
    isChangeFiscalYear: true
    startFiscalYear: string
    endFiscalYear: string
    newStartFiscalYear: string
  }>
}
