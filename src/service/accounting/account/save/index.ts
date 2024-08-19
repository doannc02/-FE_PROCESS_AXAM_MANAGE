import { accountingApi } from '@/config/axios'
import { RequestBody } from './type'

export const postAccount = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'post',
    url: '/api/v1/account',
    data: requestBody,
  })
}

export const putAccount = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'put',
    url: '/api/v1/account',
    data: requestBody,
    params: {
      accountId: requestBody.id,
    },
  })
}
