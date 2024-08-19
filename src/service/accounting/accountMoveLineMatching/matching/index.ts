import { accountingApi } from '@/config/axios'
import { RequestBody, Response } from './type'

export const postAccountMoveLineMatchingPayment = async (
  requestBody: RequestBody['POST']
): Promise<Response['POST']> => {
  const { data } = await accountingApi({
    method: 'post',
    url: `/api/v1/account-move-line-matching/mapping-payment`,
    data: requestBody,
  })

  return data
}
