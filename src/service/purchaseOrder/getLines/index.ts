import { poApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { Response } from './type'

export const getPOLines = async (params: any): Promise<Response['GET']> => {
  const { data } = await poApi({
    method: 'get',
    url: '/api/v1/purchase-order/lines',
    params,
  })
  return data
}

export const useQueryGetPOLines = (params: any, options?: any) => {
  return useQuery<Response['GET']>(
    ['/api/v1/purchase-order/lines', params],
    () => getPOLines(params),
    { ...defaultOption, ...options }
  )
}
