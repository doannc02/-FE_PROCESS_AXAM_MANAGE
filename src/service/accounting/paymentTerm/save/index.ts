import { accountingApi } from '@/config/axios'
import { RequestBody } from './type'

export const postPaymentTerm = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'post',
    url: '/api/v1/payment-term',
    data: requestBody,
  })
}

export const putPaymentTerm = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'put',
    url: '/api/v1/payment-term',
    data: requestBody,
  })
}
