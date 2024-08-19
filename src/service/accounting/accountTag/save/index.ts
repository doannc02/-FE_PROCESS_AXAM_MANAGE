import { accountingApi } from '@/config/axios'
import { RequestBody } from './type'

export const postAccountTag = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'post',
    url: `/api/v1/account-tag`,
    data: requestBody,
  })
}

export const putAccountTag = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'put',
    url: `/api/v1/account-tag`,
    data: requestBody,
  })
}
