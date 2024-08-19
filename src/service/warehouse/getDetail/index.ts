import { authWarehouseApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import useCheckPath, {
  WarehouseType,
  warehouseNestedType,
} from '@/components/hooks/path/useCheckPath'

export const getDetailStockWarehouse = async (
  params: RequestBody['GET'],
  typeWareHouse: WarehouseType
): Promise<Response['GET']> => {
  const { data } = await authWarehouseApi({
    method: 'get',
    url: `/api/v1/${warehouseNestedType[typeWareHouse]}/stock-warehouse`,
    params,
  })

  return data ? data.data : data
}

export const useQueryGetDetailStockWarehouse = (
  params: RequestBody['GET'],
  options?: any
) => {
  const { typeWareHouse } = useCheckPath()

  return useQuery<Response['GET']>(
    [`/api/v1/${warehouseNestedType[typeWareHouse]}/stock-warehouse`, params],
    () => getDetailStockWarehouse(params, typeWareHouse),
    { ...defaultOption, ...options }
  )
}
