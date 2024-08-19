import useCheckPath, {
  WarehouseType,
  warehouseNestedType,
} from '@/components/hooks/path/useCheckPath'
import { authWarehouseApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'

export const getDetailInventoryFirstPeriod = async (
  params: any,
  typeWareHouse: WarehouseType
): Promise<any> => {
  const { data } = await authWarehouseApi({
    method: 'get',
    url: `/api/v1/${warehouseNestedType[typeWareHouse]}/inventory-first-period`,
    params,
  })
  return data
}

export const useQueryGetDetailInventoryFirstPeriod = (
  params: any,
  options?: any
) => {
  const { typeWareHouse } = useCheckPath()
  return useQuery(
    ['/api/v1/internal/inventory-first-period', params],
    () => getDetailInventoryFirstPeriod(params, typeWareHouse),
    { ...defaultOption, ...options }
  )
}
