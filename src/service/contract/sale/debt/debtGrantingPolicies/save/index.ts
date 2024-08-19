import { contractApi } from '@/config/axios'
import { RequestBody } from './type'

export const postDebtPolicy = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await contractApi({
    method: 'post',
    url: '/api/v1/sale/debt-granting-policies',
    data: requestBody,
  })
}

export const putDebtPolicy = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await contractApi({
    method: 'put',
    url: '/api/v1/sale/debt-granting-policies',
    data: requestBody,
    params: {
      id: requestBody.id,
    },
  })
}
