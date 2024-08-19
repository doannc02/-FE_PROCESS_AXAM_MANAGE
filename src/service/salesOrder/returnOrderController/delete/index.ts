import { authWarehouseApi, authCommonAPI, authSOApi } from '@/config/axios'
import { RequestBody, Response } from './type'

export const deleteSaleReturnOrder = async (
  requestBody: RequestBody['DELETE']
): Promise<Response['DELETE']> => {
  const { data } = await authSOApi({
    method: 'delete',
    url: 'api/v1/sale-return-order',
    params: { id: requestBody.id },
    data: requestBody,
  })

  return data ? data.data : data
}
