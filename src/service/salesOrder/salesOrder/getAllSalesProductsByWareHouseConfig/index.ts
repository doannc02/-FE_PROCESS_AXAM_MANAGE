import { authSOApi, defaultOption } from '@/config/axios'
import { useQuery } from 'react-query'
import { Response } from './type'

export const getAllSalesProductsByWarehouse = async (
  params: any
): Promise<any> => {
  const paramsOption = { ...params }
  if (params.search === '') delete paramsOption.search

  const { data } = await authSOApi({
    method: 'get',
    url: `/api/v1/sale-order/list/inventory`,
    params: { ...paramsOption, page: params.page },
  })
  return data ? data.data : data
}

export const useQueryGetAllSalesProductsByWarehouse = (params: any) => {
  return useQuery<Response['GET']>(
    ['/api/v1/sale-order/list/inventory', params],
    () => getAllSalesProductsByWarehouse(params),
    { ...defaultOption }
  )
}
