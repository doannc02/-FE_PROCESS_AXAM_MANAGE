import { accountingApi } from '@/config/axios'
import { RequestBody, Response } from './type'

export const putPaymentDraft = async (
  requestBody: RequestBody['PUT']
): Promise<Response['PUT']> => {
  const { data } = await accountingApi({
    method: 'put',
    url: '/api/v1/account-move/payment-draft',
    params: {
      paymentId: requestBody.id,
      reason: requestBody.reason,
    },
  })

  return data
}
