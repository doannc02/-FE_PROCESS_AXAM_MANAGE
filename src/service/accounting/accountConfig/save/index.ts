import { accountingApi } from '@/config/axios'
import { RequestBody } from './type'

export const postAccountConfig = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'post',
    url: `/api/v1/account-config`,
    data: requestBody,
  })
}
