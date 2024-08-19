import { accountingApi } from '@/config/axios'

export const exportAccountTypeFile = async (
  accountLedgerId: number
): Promise<any> => {
  const res = await accountingApi({
    method: 'get',
    url: '/api/v1/account-types/export',
    responseType: 'blob',
    params: {
      accountLedgerId,
    },
  })

  return res.data
}
