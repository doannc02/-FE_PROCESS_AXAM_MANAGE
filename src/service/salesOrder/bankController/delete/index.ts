import { authWarehouseApi, authCommonAPI } from '@/config/axios'
import { RequestBody, Response } from './type'

export const deleteBank = async (
  requestBody: RequestBody['DELETE']
): Promise<Response['DELETE']> => {
  const { data } = await authCommonAPI({
    method: 'delete',
    url: 'api/v1/bank',
    params: { bankId: requestBody.id },
    data: requestBody,
  })

  return data ? data.data : data
}
