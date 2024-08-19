import { authWarehouseApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getMaterialLevelConfig = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authWarehouseApi({
    method: 'get',
    url: '/api/v1/sale/bill-of-material/list',
    params,
  })

  return data ? data.data : data
}

export const getMaterialLevelConfigByProduct = async (
  params: any
): Promise<any> => {
  const { data } = await authWarehouseApi({
    method: 'get',
    url: '/api/v1/sale/bill-of-material/product',
    params,
  })

  return data ? data.data : data
}

export const useQueryGetMaterialLevelConfig = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/sale/bill-of-material/list', params],
    () => getMaterialLevelConfig(params),
    { ...defaultOption, ...options }
  )
}

export const useQueryGetMaterialLevelConfigByProduct = (
  params: any,
  options?: any
) => {
  return useQuery<any>(
    ['/api/v1/sale/bill-of-material/list/product', params],
    () => getMaterialLevelConfigByProduct(params),
    { ...defaultOption, ...options }
  )
}
