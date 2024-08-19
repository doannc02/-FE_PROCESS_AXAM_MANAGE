import { authSOApi, defaultOption } from '@/config/axios'
import { useQuery } from 'react-query'
import { ResponseProduct } from '../getAllSaleProducts/type'
import { useCheckPath, TypePath } from '@/path'
import { RequestProductPriceListPolicy } from './type'

export const getProductOfPriceListPolicy = async (
  params: RequestProductPriceListPolicy['PARAMS'],
  typePath: TypePath | string
): Promise<ResponseProduct['GET']> => {
  const url = `/api/v1/merchant/sale-order/policy/products`
  const { data } = await authSOApi({
    method: 'get',
    url,
    params,
  })
  return data
}

export const useQueryGetProductOfPriceListPolicy = (
  params: RequestProductPriceListPolicy['PARAMS'],
  options?: any
) => {
  const { typeSaleRequest } = useCheckPath()
  return useQuery<ResponseProduct['GET']>(
    [
      `/api/v1/${typeSaleRequest.toLowerCase()}/sale-order/policy/products`,
      params,
    ],
    () => getProductOfPriceListPolicy(params, typeSaleRequest),
    { ...defaultOption, ...options }
  )
}
