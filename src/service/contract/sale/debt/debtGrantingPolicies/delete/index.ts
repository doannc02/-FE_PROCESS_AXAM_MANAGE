import { contractApi } from '@/config/axios'
import { RequestBody, Response } from './type'

export const deleteDebtPolicy = async (
  params: RequestBody['DELETE']
): Promise<Response['DELETE']> => {
  const { data } = await contractApi({
    method: 'delete',
    url: '/api/v1/sale/debt-granting-policies',
    params,
  })
  return data
}
