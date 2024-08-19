import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParams, Response } from './type'

export const getAccountingBookDetail = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: '/api/v1/accounting-book-key',
    params,
  })
  return data
}

export const useQueryGetAccountingBookDetail = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    ['/api/v1/accounting-book-key', params],
    () => getAccountingBookDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
