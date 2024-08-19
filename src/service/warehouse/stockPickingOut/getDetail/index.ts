import { authWarehouseApi, defaultOption } from '@/config/axios'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getStockPickingOutDetail = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authWarehouseApi({
    method: 'get',
    url: 'api/v1/stock-picking/out',
    params,
  })

  return data ? data.data : data
}

export const getStockPickingOutDetailV2 = async (
  params: RequestBody['GET']
): Promise<Response['GETV2']> => {
  const { data } = await authWarehouseApi({
    method: 'get',
    url: 'api/v1/stock-picking/out',
    params,
  })

  return data
}

export const getStockPickingInDetail = async (
  params: RequestBody['GET']
): Promise<Response['GETV2']> => {
  const { data } = await authWarehouseApi({
    method: 'get',
    url: 'api/v1/stock-picking/in',
    params,
  })

  return data
}

export const getStockPickingTypeListWarehouse = async (params: any) => {
  const { data } = await authWarehouseApi({
    method: 'get',
    url: '/api/v1/stock-picking-type/list',
    params,
  })

  return data ? data.data.data : data
}

export const useQueryGetStockPickingOutDetail = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['api/v1/stock-picking/out', params],
    () => getStockPickingOutDetail(params),
    { ...defaultOption, ...options }
  )
}

export const useQueryGetStockPickingOutDetailV2 = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GETV2']>(
    ['api/v1/stock-picking/out', params],
    () => getStockPickingOutDetailV2(params),
    { ...defaultOption, ...options }
  )
}

export const useQueryGetStockPickingInDetail = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GETV2']>(
    ['api/v1/stock-picking/in', params],
    () => getStockPickingInDetail(params),
    { ...defaultOption, ...options }
  )
}
