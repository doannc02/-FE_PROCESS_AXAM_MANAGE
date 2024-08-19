import { authSOApi, defaultOption } from '@/config/axios'
import { useQuery } from 'react-query'
import { Response } from './type'

export const getListProductReturnDetails = async (
  params: any
): Promise<any> => {
  const paramsOption = { ...params }
  if (params.search === '') delete paramsOption.search

  const { data } = await authSOApi({
    method: 'get',
    url: `/api/v1/sale-return-order/all-returned-product-quantity`,
    params: { ...paramsOption, page: params.page },
  })
  return data ? data.data : data
}

export const useQueryGetListProductReturnDetails = (params: any) => {
  return useQuery<Response['GET']>(
    ['/api/v1/sale-return-order/all-returned-product-quantity', params],
    () => getListProductReturnDetails(params),
    { ...defaultOption }
  )
}
