import { accountingApi } from '@/config/axios'
import { RequestParams, Response } from './type'

export const postAccountMoveLineMatching = async (
  requestBody: RequestParams['POST']
): Promise<Response['POST']> => {
  const { data } = await accountingApi({
    method: 'post',
    url: `/api/v1/account-move-line-matching`,
    data: requestBody,
  })

  return data
}
