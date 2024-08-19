import { commonApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParam, Response } from './type'

export const getCurrencyRate = async (
  params: RequestParam['GET']
): Promise<Response['GET']> => {
  const { data } = await commonApi({
    method: 'get',
    url: '/api/v1/currency-rate/detail-rate',
    params: params,
  })
  return data
}

export const useQueryCurrencyRate = (
  params: RequestParam['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/currency-rate/detail-rate', params],
    () => getCurrencyRate(params),
    { ...defaultOption, ...options }
  )
}
