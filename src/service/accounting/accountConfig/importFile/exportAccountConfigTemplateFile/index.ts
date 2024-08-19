import { accountingApi } from '@/config/axios'

export const exportAccountConfigFile = async (
  accountLedgerId: number
): Promise<any> => {
  const res = await accountingApi({
    method: 'get',
    url: '/api/v1/accounts/export',
    responseType: 'blob',
    params: {
      accountLedgerId,
    },
  })

  return res.data
}
