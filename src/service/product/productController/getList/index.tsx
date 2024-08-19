import { productApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getProductList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await productApi({
    method: 'get',
    url: '/api/v1/product/list',
    params,
  })
  return data
}

export const useQueryGetProductList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/product/list', params],
    () => getProductList(params),
    { ...defaultOption, ...options }
  )
}
