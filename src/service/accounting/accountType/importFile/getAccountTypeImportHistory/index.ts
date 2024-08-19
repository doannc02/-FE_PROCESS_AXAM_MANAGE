import { useQuery } from 'react-query'
import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { RequestBody } from './type'

export const getAccountTypeImportHistory = async (): Promise<any> => {
  const { data } = await accountingApi({
    method: 'get',
    url: '/api/v1/account-types/list',
  })

  return data
}

export const useQueryGetAccountTypeImportHistory = (
  params: any,
  options?: any
) => {
  return useQuery<RequestBody['GET']>(
    ['/api/v1/account-types/list'],
    () => getAccountTypeImportHistory(),
    { ...defaultOption, ...options }
  )
}
