import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getAccountJournalCashBank = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: 'api/v1/account-journal/cash-bank',
    params,
  })

  return data
}

export const useQueryGetAccountJournalCashBankList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['api/v1/account-journal/cash-bank', params],
    () => getAccountJournalCashBank(params),
    { ...defaultOption, ...options }
  )
}
