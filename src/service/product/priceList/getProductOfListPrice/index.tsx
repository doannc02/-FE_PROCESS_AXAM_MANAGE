import { productApi, authSOApi, defaultOption } from '@/config/axios'
import { useQuery } from 'react-query'
import { Response, RequestProductPriceList } from './type'
import { useCheckPath } from '@/path'

export const getWholesaleProductsPolicy = async (
  params: RequestProductPriceList['PARAMS']
): Promise<Response['GET']> => {
  const paramsOption = { ...params }
  const { data } = await authSOApi({
    method: 'get',
    url: `/api/v1/wholesale/sale-order/policy/products`,
    params: { ...paramsOption, page: params.page },
  })
  return data ? data.data : data
}

export const getRetailProductsPolicy = async (
  params: RequestProductPriceList['PARAMS']
): Promise<Response['GET']> => {
  const paramsOption = { ...params }
  const { data } = await authSOApi({
    method: 'get',
    url: `/api/v1/retail/sale-order/policy/products`,
    params: { ...paramsOption, page: params.page },
  })
  return data ? data.data : data
}

export const getLiquidationProducts = async (
  params: RequestProductPriceList['PARAMS']
): Promise<Response['GET']> => {
  const paramsOption = { ...params }
  const { data } = await authSOApi({
    method: 'get',
    url: `/api/v1/clearance/sale-order/products`,
    params: { ...paramsOption, page: params.page },
  })
  return data ? data.data : data
}

export const useQueryGetProductOfPriceList = (
  params: RequestProductPriceList['PARAMS'],
  options?: any
) => {
  const { typeSaleRequest } = useCheckPath()
  return useQuery<Response['GET']>(
    ['/api/v1/retail/sale-order/policy/products', params],
    () =>
    typeSaleRequest === 'RETAIL'
        ? getRetailProductsPolicy(params)
        : typeSaleRequest === 'CLEARANCE'
        ? getLiquidationProducts(params)
        : getWholesaleProductsPolicy(params),
    { ...defaultOption, ...options }
  )
}
