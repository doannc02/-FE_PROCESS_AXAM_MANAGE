import { authCommonAPI } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { ReqGetBankAccountList, ResGetBankAccountList } from './type'

export const URL = '/api/v1/partners/bank-accounts'

export const getBankAccountByPartnerList = async (
  params?: ReqGetBankAccountList
): Promise<ResGetBankAccountList> => {
  const { data } = await authCommonAPI({
    method: 'get',
    url: URL,
    params,
  })
  return data
}

export const useQueryGetBankAccountByPartnerList = (
  params?: ReqGetBankAccountList,
  options?: any
) => {
  return useQuery<ResGetBankAccountList>(
    [URL, params],
    () => getBankAccountByPartnerList(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
