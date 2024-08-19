import { productApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getProductTinyList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await productApi({
    method: 'get',
    url: '/api/v1/product-with-uom/list',
    params,
  })
  return data
}

export const getProductTinyForPurchase = async (
  params: RequestBody['GET']
): Promise<Response['GETV2']> => {
  const { data } = await productApi({
    method: 'get',
    url: '/api/v2/product/vendor/list',
    params,
  })
  return data
}

export const useQueryGetProductTinyList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/product-with-uom/list'],
    () => getProductTinyList(params),
    { ...defaultOption, ...options }
  )
}
