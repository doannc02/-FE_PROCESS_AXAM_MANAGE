import { accountingApi } from '@/config/axios'
import { RequestBody } from './type'

export const postAccountingBookKey = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'post',
    url: '/api/v1/accounting-book-key',
    data: requestBody.body,
    params: requestBody.params,
  })
}

export const putAccountingBookKey = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'put',
    url: '/api/v1/accounting-book-key',
    data: requestBody.body,
    params: requestBody.params,
  })
}
