import { authWarehouseApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import {
  WarehouseType,
  warehouseNestedType,
} from '@/components/hooks/path/useCheckPath'

export const getWarehouseLocation = async (
  params: RequestBody['GET'],
  typeWareHouse: WarehouseType
): Promise<Response['GET']> => {
  const { data } = await authWarehouseApi({
    method: 'get',
    url: `/api/v1/${warehouseNestedType[typeWareHouse]}/stock-location/list`,
    params,
  })

  return data
}

// export const useQueryGetWarehouseLocationManagement = (
//   params: RequestBody['GET'],
//   options?: any
// ) => {
//   return useQuery<Response['GET']>(
//     ['/api/v1/sale/stock-location/list', params],
//     () => getWarehouseLocation(params),
//     { ...defaultOption, ...options }
//   )
// }
