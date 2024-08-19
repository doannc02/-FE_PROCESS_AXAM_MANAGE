import { accountingApi } from '@/config/axios'
import { Response } from './type'

export const importDeclareBalanceApi = async (
  accountLedgerId: number,
  requestBody: any
): Promise<Response['SAVE']> => {
  const { data } = await accountingApi({
    method: 'POST',
    url: '/api/v1/customer-balance/import',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: requestBody,
    params: {
      accountLedgerId,
    },
  })
  return data?.data
}
