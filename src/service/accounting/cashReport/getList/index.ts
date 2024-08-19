import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { ReqCashReport, ResCashReport } from './type'

export const CashReportUrl = '/api/v1/cash-report'

export const getCashReportList = async (
  params: ReqCashReport
): Promise<ResCashReport> => {
  const { data } = await accountingApi({
    method: 'get',
    url: CashReportUrl + '/list',
    params,
  })

  return data
}

export const useQueryGetCashReportList = (
  params: ReqCashReport,
  options?: any
) => {
  return useQuery<ResCashReport>(
    [CashReportUrl + '/list', params],
    () => getCashReportList(params),
    { ...defaultOption, ...options }
  )
}
