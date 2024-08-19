import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParams, Response } from './type'

export const getCalculator = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: '/api/v1/increase-tool/calculator',
    params,
  })
  return data
}

export const useQueryGetCalculator = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    ['/api/v1/increase-tool/calculator', params],
    () => getCalculator(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
