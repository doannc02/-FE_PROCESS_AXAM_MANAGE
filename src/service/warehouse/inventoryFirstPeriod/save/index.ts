import { authWarehouseApi } from '@/config/axios'
import { RequestBody } from './type'
import {
  WarehouseType,
  warehouseNestedType,
} from '@/components/hooks/path/useCheckPath'

export const postInventoryFirstPeriod = async ({
  requestBody,
  typeWareHouse,
}: {
  requestBody: RequestBody['POST']
  typeWareHouse: WarehouseType
}): Promise<any> => {
  return await authWarehouseApi({
    method: 'post',
    url: `/api/v1/${warehouseNestedType[typeWareHouse]}/inventory-first-period`,
    data: requestBody,
  })
}

export const putInventoryFirstPeriod = async ({
  requestBody,
  typeWareHouse,
}: {
  requestBody: RequestBody['POST']
  typeWareHouse: WarehouseType
}): Promise<any> => {
  return await authWarehouseApi({
    method: 'put',
    url: `/api/v1/${warehouseNestedType[typeWareHouse]}/inventory-first-period`,
    data: requestBody,
    params: {
      id: requestBody.id,
    },
  })
}
