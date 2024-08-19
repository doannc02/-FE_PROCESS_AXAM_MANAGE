import { authWarehouseApi } from '@/config/axios'
import { RequestBody } from './type'
import {
  WarehouseType,
  warehouseNestedType,
} from '@/components/hooks/path/useCheckPath'

export const postPricingConfig = async ({
  requestBody,
  typeWareHouse,
}: {
  requestBody: RequestBody['SAVE']
  typeWareHouse: WarehouseType
}): Promise<any> => {
  return await authWarehouseApi({
    method: 'post',
    url: `/api/v1/${warehouseNestedType[typeWareHouse]}/pricing-method-config`,
    data: requestBody,
  })
}

// export const putPricingConfig = async (
//   requestBody: RequestBody['SAVE']
// ): Promise<any> => {
//   return await accountingApi({
//     method: 'put',
//     url: '/api/v1/account',
//     data: requestBody,
//     params: {
//       accountId: requestBody.id,
//     },
//   })
// }
