import { accountingApi } from '@/config/axios'
import { RequestBody, ResponseBody } from './type'

export const importAccountTypeFile = async (
  accountLedgerId: number,
  data: RequestBody['POST']
): Promise<ResponseBody['POST']> => {
  const res = await accountingApi({
    method: 'POST',
    url: '/api/v1/account-types/import',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: {
      accountLedgerId,
    },
  })

  return res.data?.data
}
