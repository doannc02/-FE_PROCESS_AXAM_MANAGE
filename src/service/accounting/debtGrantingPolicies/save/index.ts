import { accountingApi } from '@/config/axios'
import { RequestBody } from './type'

export const postDebtPolicy = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'post',
    url: '/api/v1/debt-granting-policies',
    data: requestBody,
  })
}

export const putDebtPolicy = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'put',
    url: '/api/v1/debt-granting-policies',
    data: requestBody,
    params: {
      id: requestBody.id,
    },
  })
}
