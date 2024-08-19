import { authWarehouseApi, defaultOption } from '@/config/axios'
import { RequestBody, Response } from './type'
import useCheckPath, {
  WarehouseType,
  warehouseNestedType,
} from '@/components/hooks/path/useCheckPath'
import { useQuery } from 'react-query'

export const getSerialManagementSerial = async (
  params: RequestBody['GET'],
  typeWareHouse: WarehouseType
): Promise<Response['GET']> => {
  const { data } = await authWarehouseApi({
    method: 'get',
    url: `/api/v1/${warehouseNestedType[typeWareHouse]}/stock-serial-lot/serials`,
    params: params,
  })

  return data
}

export const useQueryGetSerialManagement = (
  params: RequestBody['GET'],
  options?: any
) => {
  const {typeWareHouse} = useCheckPath()
  return useQuery<Response['GET']>(
    ['/api/v1/sale/stock-serial-lot/serials', params],
    () => getSerialManagementSerial(params, typeWareHouse),
    { ...defaultOption, ...options }
  )
}
