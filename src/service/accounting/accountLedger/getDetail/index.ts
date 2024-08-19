import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParams, Response } from './type'

export const getAccountLedgerDetail = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: '/api/v1/account-ledger',
    params,
  })
  return data
}

export const useQueryGetAccountLedgerDetail = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    ['/api/v1/account-ledger', params],
    () => getAccountLedgerDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
