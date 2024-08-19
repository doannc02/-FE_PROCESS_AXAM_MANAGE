import { authSOApi } from '@/config/axios'
import { RequestBody, Response } from './type'

export const postComputeTaxLines = async (
  data: RequestBody['POST']
): Promise<Response['POST']> => {
  const res = await authSOApi({
    method: 'POST',
    url: `/api/v1/tax/compute-tax-lines`,
    data,
  })
  return res ? res.data.data : res
}
