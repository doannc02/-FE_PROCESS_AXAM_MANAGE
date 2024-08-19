import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParams, Response } from './type'

export const getPageHisCusDeclareBalList = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: '/api/v1/customer-balance/list',
    params,
  })
  return data
}

export const useQueryGetPageHisCusDeclareBalList = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/customer-balance/list', params],
    () => getPageHisCusDeclareBalList(params),
    { ...defaultOption, ...options }
  )
}
