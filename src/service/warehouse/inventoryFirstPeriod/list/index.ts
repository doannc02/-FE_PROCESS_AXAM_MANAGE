import { authWarehouseApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import {
  InventoryFirstPeriodImportExcel,
  RequestBody,
  RequestParams,
  Response,
} from './type'
import useCheckPath, {
  WarehouseType,
  warehouseNestedType,
} from '@/components/hooks/path/useCheckPath'

export const getInventoryFirstPeriodList = async (
  params: RequestBody['GET'],
  typeWareHouse: WarehouseType
): Promise<Response['GET']> => {
  const { data } = await authWarehouseApi({
    method: 'get',
    url: `/api/v1/${warehouseNestedType[typeWareHouse]}/inventory-first-period/list`,
    params,
  })

  return data
}

export const useQueryGetInventoryFirstPeriodList = (
  params: RequestBody['GET'],
  options?: any
) => {
  const { typeWareHouse } = useCheckPath()

  return useQuery<Response['GET']>(
    ['/api/v1/internal/inventory-first-period/list', params],
    () => getInventoryFirstPeriodList(params, typeWareHouse),
    { ...defaultOption, ...options }
  )
}

export const importExcelApi = async (
  requestBody: any,
  params: RequestParams['POST']
): Promise<any> => {
  const { data } = await authWarehouseApi({
    method: 'post',
    url: '/api/v1/internal/inventory-first-period/import-excel',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: requestBody,
    params,
    // responseType: 'blob',
  })
  return data
}

export const exportFileErrorApi = async (
  requestBody: InventoryFirstPeriodImportExcel[]
): Promise<Blob> => {
  const { data } = await authWarehouseApi({
    method: 'post',
    url: '/api/v1/internal/inventory-first-period/export-excel',
    data: requestBody,
    responseType: 'blob',
  })

  return data
}

export const submitDataValidApi = async (
  requestBody: InventoryFirstPeriodImportExcel[]
): Promise<any> => {
  const { data } = await authWarehouseApi({
    method: 'post',
    url: '/api/v1/internal/inventory-first-period/submit-data-valid',
    data: requestBody,
  })

  return data
}
