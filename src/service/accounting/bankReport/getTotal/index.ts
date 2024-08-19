import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { ReqBankReportTotal, ResBankReportTotal } from './type'
import { BankReportUrl } from '../getList'

export const getBankReportTotal = async (
  params: ReqBankReportTotal
): Promise<ResBankReportTotal> => {
  const { data } = await accountingApi({
    method: 'get',
    url: BankReportUrl,
    params,
  })

  return data
}

export const useQueryGetBankReportTotal = (
  params: ReqBankReportTotal,
  options?: any
) => {
  return useQuery<ResBankReportTotal>(
    [BankReportUrl, params],
    () => getBankReportTotal(params),
    { ...defaultOption, ...options }
  )
}
