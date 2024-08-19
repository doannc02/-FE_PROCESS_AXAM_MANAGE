import { accountingApi } from '@/config/axios'
import { RequestBody, Response } from './type'

export const deleteCashRounding = async (
  params: RequestBody['DELETE']
): Promise<Response['DELETE']> => {
  const { data } = await accountingApi({
    method: 'delete',
    url: `/api/v1/cash-rounding`,
    params,
  })
  return data
}
