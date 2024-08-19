import { authWarehouseApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { BaseResponse } from '@/service/type'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import useCheckPath, {
  WarehouseType,
  warehouseNestedType,
} from '@/components/hooks/path/useCheckPath'

export const getStockPickingList = async (
  params: RequestBody['GET'],
  typeWareHouse: WarehouseType
): Promise<Response['GET']> => {
  const { data } = await authWarehouseApi({
    method: 'get',
    url: `/api/v1/${warehouseNestedType[typeWareHouse]}/stock-picking/in/list`,
    params,
  })
  return data
}

export const useQueryGetStockPickingList = (
  params: RequestBody['GET'],
  options?: any
) => {
  const { typeWareHouse } = useCheckPath()
  return useQuery<Response['GET']>(
    [
      `/api/v1/${warehouseNestedType[typeWareHouse]}/stock-picking/in/list`,
      params,
    ],
    () => getStockPickingList(params, typeWareHouse),
    { ...defaultOption, ...options }
  )
}

export const getAutoGenerateSerial = async (params: {
  numberSerial: number
}): Promise<BaseResponse<string[]>> => {
  const { data } = await authWarehouseApi({
    method: 'get',
    url: '/api/v1/internal/stock-picking/auto-generate-serial',
    params,
  })
  return data
}

export const useQueryGetAutoGenerateSerial = (
  params: { numberSerial: number },
  options?: any
) => {
  return useQuery<BaseResponse<string[]>>(
    ['/api/v1/internal/stock-picking/auto-generate-serial', params],
    () => getAutoGenerateSerial(params),
    { ...defaultOption, ...options }
  )
}
