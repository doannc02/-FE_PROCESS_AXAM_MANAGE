import { accountingApi } from '@/config/axios'

export const getExVenDeclareBalanceDetail = async (
  accountLedgerId: number
): Promise<any> => {
  const res = await accountingApi({
    method: 'get',
    url: '/api/v1/vendor-balance/export',
    responseType: 'blob',
    params: {
      accountLedgerId,
    },
  })
  return res.data
}
