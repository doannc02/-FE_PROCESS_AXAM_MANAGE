import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { ReqBankReport, ResBankReport } from './type'

export const BankReportUrl = '/api/v1/bank-report'

export const getBankReportList = async (
  params: ReqBankReport
): Promise<ResBankReport> => {
  const { data } = await accountingApi({
    method: 'get',
    url: BankReportUrl + '/list',
    params,
  })

  return data
}

export const useQueryGetBankReportList = (
  params: ReqBankReport,
  options?: any
) => {
  return useQuery<ResBankReport>(
    [BankReportUrl + '/list', params],
    () => getBankReportList(params),
    { ...defaultOption, ...options }
  )
}
