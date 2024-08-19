import { accountingApi } from '@/config/axios'

export const getExCusDeclareBalanceDetail = async (
  accountLedgerId: number
): Promise<any> => {
  const res = await accountingApi({
    method: 'get',
    url: '/api/v1/customer-balance/export',
    responseType: 'blob',
    params: {
      accountLedgerId,
    },
  })
  return res.data
}
