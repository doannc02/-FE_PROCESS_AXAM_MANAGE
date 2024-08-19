import { accountingApi } from '@/config/axios'
import { RequestBody } from './type'

export const postAccountPayment = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'post',
    url: '/api/v1/account-payment',
    data: requestBody,
  })
}
