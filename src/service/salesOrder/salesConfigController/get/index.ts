import {
  authWarehouseApi,
  defaultOption,
  authCommonAPI,
  authSOApi,
} from '@/config/axios'
import { useQuery } from 'react-query'
import { Request, Response } from './type'

export const getSaleConfigController = async (
  params: Request['GET']
): Promise<Response> => {
  const { data } = await authSOApi({
    method: 'get',
    url: 'api/v1/sale-config',
    params,
  })

  return data ? data.data : data
}

export const useQueryGetSaleConfigController = (
  params: Request['GET'],
  options?: any
) => {
  return useQuery<Response>(
    ['api/v1/sale-config', params],
    () => getSaleConfigController(params),
    { ...defaultOption, ...options }
  )
}
