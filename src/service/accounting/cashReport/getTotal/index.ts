import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { ReqCashReportTotal, ResCashReportTotal } from './type'
import { CashReportUrl } from '../getList'

export const getCashReportTotal = async (
  params: ReqCashReportTotal
): Promise<ResCashReportTotal> => {
  const { data } = await accountingApi({
    method: 'get',
    url: CashReportUrl,
    params,
  })

  return data
}

export const useQueryGetCashReportTotal = (
  params: ReqCashReportTotal,
  options?: any
) => {
  return useQuery<ResCashReportTotal>(
    [CashReportUrl, params],
    () => getCashReportTotal(params),
    { ...defaultOption, ...options }
  )
}
