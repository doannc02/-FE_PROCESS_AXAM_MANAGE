import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { Response } from './type'

export const getAccountConfig = async (): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: '/api/v1/account-config',
  })
  return data
}

export const useQueryGetAccountConfig = (options?: any) => {
  return useQuery([`/api/v1/account-config`], () => getAccountConfig(), {
    ...defaultOption,
    ...options,
  })
}
