import { accountingApi } from '@/config/axios'
import { RequestBody } from './type'

export const postPaymentPaidDebt = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'post',
    url: '/api/v2/debt-paid/payment',
    data: requestBody,
  })
}
