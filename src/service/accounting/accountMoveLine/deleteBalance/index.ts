import { accountingApi } from '@/config/axios'
import { RequestBody, Response } from './type'

export const deleteBalance = async (
  requestBody: RequestBody['DELETE']
): Promise<Response['DELETE']> => {
  const { data } = await accountingApi({
    method: 'delete',
    url: '/api/v1/account-move-line',
    data: requestBody,
    params: {
      beginType: requestBody.beginType,
    },
  })
  return data
}
