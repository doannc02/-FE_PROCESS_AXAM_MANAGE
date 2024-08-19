import { accountingApi } from '@/config/axios'
import { RequestBody } from './type'

export const postAccountType = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'post',
    url: '/api/v1/account-type',
    data: requestBody,
  })
}

export const putAccountType = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'put',
    url: '/api/v1/account-type',
    data: requestBody,
  })
}
