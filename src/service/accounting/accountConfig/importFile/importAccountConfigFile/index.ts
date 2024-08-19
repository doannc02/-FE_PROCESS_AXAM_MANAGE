import { accountingApi } from '@/config/axios'
import { RequestBody, ResponseBody } from './type'

export const importAccountConfigFile = async (
  accountLedgerId: number,
  data: RequestBody['POST']
): Promise<ResponseBody['POST']> => {
  const res = await accountingApi({
    method: 'POST',
    url: '/api/v1/accounts/import',
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
