import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getBankBalanceList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: '/api/v1/account-move-line/list-beginning',
    params,
  })

  return data
}

export const useQueryGetBankBalanceList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/account-move-line/list-beginning', params],
    () => getBankBalanceList(params),
    { ...defaultOption, ...options }
  )
}
