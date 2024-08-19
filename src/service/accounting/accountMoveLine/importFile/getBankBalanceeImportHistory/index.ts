import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody } from './type'

export const getBankBalanceImportHistory = async (params: {
  accountLedgerId: number
}): Promise<any> => {
  const { data } = await accountingApi({
    method: 'get',
    url: '/api/v1/bank-balance/list',
    params,
  })

  return data
}

export const useQueryGetBankBalanceImportHistory = (
  params: {
    accountLedgerId: number
  },
  options?: any
) => {
  return useQuery<RequestBody['GET']>(
    ['/api/v1/account-types/list', params],
    () => getBankBalanceImportHistory(params),
    { ...defaultOption, ...options }
  )
}
