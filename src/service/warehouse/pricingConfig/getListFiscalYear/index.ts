import { authCommonAPI, authWarehouseApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import useCheckPath, {
  warehouseNestedType,
  WarehouseType,
} from '@/components/hooks/path/useCheckPath'

export const getListFiscalYear = async (
  params: RequestBody['GET'],
  typeWareHouse: WarehouseType
): Promise<Response['GET']> => {
  const { data } = await authWarehouseApi({
    method: 'get',
    url: `/api/v1/${warehouseNestedType[typeWareHouse]}/pricing-method-config/fiscal-year/list`,
    params,
  })

  return data
}

export const useQueryGetListFiscalYear = (
  params: RequestBody['GET'],
  options?: any
) => {
  const { typeWareHouse } = useCheckPath()

  return useQuery<Response['GET']>(
    [
      `/api/v1/${warehouseNestedType[typeWareHouse]}/pricing-method-config/fiscal-year/list`,
      params,
    ],
    () => getListFiscalYear(params, typeWareHouse),
    { ...defaultOption, ...options }
  )
}
