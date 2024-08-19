import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParams, Response } from './type'

export const getDecreaseToolDetail = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: '/api/v1/decrease-tools',
    params,
  })
  return data
}

export const useQueryGetDecreaseToolDetail = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    ['/api/v1/increase-tools', params],
    () => getDecreaseToolDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
