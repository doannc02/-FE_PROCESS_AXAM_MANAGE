import { accountingApi, defaultOption } from '@/config/axios'
import { RequestBody, Response } from './type'
import { useQuery } from 'react-query'

export const getAccountLedger = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: '/api/v1/account-ledger/list',
    params,
  })
  return data
}

export const useGetAccountLedger = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/account-ledger/list', params],
    () => getAccountLedger(params),
    { ...defaultOption, ...options }
  )
}
