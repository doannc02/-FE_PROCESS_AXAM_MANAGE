import { accountingApi, poApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { Response } from './type'

export const getPOGroupProduct = async (params: any): Promise<Response['GET']> => {
  const { data } = await poApi({
    method: 'get',
    url: '/api/v1/purchase-order/group-product',
    params,
  })
  return data
}

export const useQueryGetPOGroupProduct = (params: any, options?: any) => {
  return useQuery<Response['GET']>(
    ['/api/v1/purchase-order/group-product', params],
    () => getPOGroupProduct(params),
    { ...defaultOption, ...options }
  )
}
