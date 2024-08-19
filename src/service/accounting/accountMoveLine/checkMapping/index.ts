import { accountingApi } from '@/config/axios'
import { RequestBody, Response } from './type'

export const postCheckMappingBalance = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: '/api/v1/account-move-line/check-matching',
    params,
  })
  return data
}
