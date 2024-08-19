import { accountingApi } from '@/config/axios'
import { RequestBody } from './type'

export const postEntry = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'post',
    url: '/api/v1/account-move/entry',
    data: requestBody,
  })
}

export const putEntry = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'put',
    url: '/api/v1/account-move/entry',
    data: requestBody,
  })
}
