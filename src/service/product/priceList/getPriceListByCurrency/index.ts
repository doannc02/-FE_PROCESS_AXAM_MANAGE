import { productApi, defaultOption } from '@/config/axios'
import { useQuery } from 'react-query'
import { RequestBody, ResponsePriceList } from './type'
import { TypePath, useCheckPath } from '@/path'

export const getPriceListByCurrency = async (
  params: RequestBody['GET'],
  typePath: TypePath
): Promise<ResponsePriceList['GET']> => {
  let pathName =
    typePath === 'WHOLESALE' ? 'B2B' : typePath === 'RETAIL' ? 'B2C' : typePath
  const url = `/api/v1/${pathName.toLowerCase()}/price-list/list`
  const { data } = await productApi({
    method: 'get',
    url,
    params,
  })
  return data
}

export const getPriceListByCurrencyNew = async (
  params: RequestBody['GET']
): Promise<ResponsePriceList['GET']> => {
  const url = `/api/v1/${params?.typePath?.toLowerCase()}/price-list/list`
  const { data } = await productApi({
    method: 'get',
    url,
    params,
  })
  return data
}

export const useQueryGetPriceListByCurrency = (
  params: RequestBody['GET'],
  options?: any
) => {
  const { typeSaleRequest } = useCheckPath()
  return useQuery<ResponsePriceList['GET']>(
    [`/api/v1/${typeSaleRequest.toLowerCase()}/price-list/list`, params],
    () => getPriceListByCurrency(params, typeSaleRequest),
    { ...defaultOption, ...options }
  )
}
