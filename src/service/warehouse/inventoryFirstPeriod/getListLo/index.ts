import { authWarehouseApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import {
  WarehouseType,
  warehouseNestedType,
} from '@/components/hooks/path/useCheckPath'

export const getLotManagementLot = async (
  params: RequestBody['GET'],
  typeWareHouse: WarehouseType
): Promise<Response['GET']> => {
  const { data } = await authWarehouseApi({
    method: 'get',
    url: `/api/v1/${warehouseNestedType[typeWareHouse]}/stock-serial-lot/lots`,
    params: params,
  })

  return data
}

// export const useQueryGetLotManagement = (
//   params: RequestBody['GET'],
//   options?: any
// ) => {
//   return useQuery<Response['GET']>(
//     ['/api/v1/sale/stock-serial-lot/lots', params],
//     () => getLotManagementLot(params),
//     { ...defaultOption, ...options }
//   )
// }
