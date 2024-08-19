import { accountingApi } from '@/config/axios'
import { RequestBody } from './type'

export const postTax = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'post',
    url: `/api/v1/tax`,
    data: requestBody,
  })
}

export const putTax = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'put',
    url: `/api/v1/tax`,
    data: requestBody,
  })
}
