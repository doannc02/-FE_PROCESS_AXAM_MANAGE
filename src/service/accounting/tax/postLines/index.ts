import { accountingApi } from '@/config/axios'
import { RequestBody } from './type'

export const postTaxLines = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  return await accountingApi({
    method: 'post',
    url: `/api/v1/tax/compute-tax-lines`,
    data: requestBody,
  })
}
