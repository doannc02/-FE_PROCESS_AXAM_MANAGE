import { authWarehouseApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParams, Response } from './type'
import useCheckPath, {
  WarehouseType,
  warehouseNestedType,
} from '@/components/hooks/path/useCheckPath'

export const getDepartmentViewInventoryByWarehouse = async (
  params: RequestParams['GET'],
  typeWareHouse: WarehouseType
): Promise<Response['GET']> => {
  const { data } = await authWarehouseApi({
    method: 'get',
    url: `/api/v1/${warehouseNestedType[typeWareHouse]}/acc/warehouse-inventory/warehouse/list`,
    params,
  })

  return data
}

export const useQueryGetInventoryByWarehouse = (
  params: RequestParams['GET'],
  options?: any
) => {
  const { typeWareHouse } = useCheckPath()

  return useQuery<Response['GET']>(
    [`/api/v1/acc/warehouse-inventory/warehouse/list`, params],
    () => getDepartmentViewInventoryByWarehouse(params, typeWareHouse),
    { ...defaultOption, ...options }
  )
}
