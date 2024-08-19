import { accountingApi } from '@/config/axios'
import { RequestBody } from './type'

export const postCreateInternalTransfer = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'post',
    url: `/api/v1/account-payment/internal-transfer`,
    data: requestBody,
  })
}

export const putCreateInternalTransfer = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'put',
    url: `/api/v1/account-payment/internal-transfer`,
    data: requestBody,
    params: {
      paymentId: requestBody.id,
    },
  })
}
