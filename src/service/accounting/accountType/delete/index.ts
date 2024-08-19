import { accountingApi } from '@/config/axios'
import { RequestBody, Response } from './type'

export const deleteAccountType = async (
  requestBody: RequestBody['DELETE']
): Promise<Response['DELETE']> => {
  const { data } = await accountingApi({
    method: 'delete',
    url: '/api/v1/account-type',
    data: requestBody,
  })
  return data
}
