import { useQuery } from 'react-query'
import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { RequestBody } from './type'

export const getAccountConfigImportHistory = async (): Promise<any> => {
  const { data } = await accountingApi({
    method: 'get',
    url: '/api/v1/accounts/list',
  })

  return data
}

export const useQueryGetAccountConfigImportHistory = (options?: any) => {
  return useQuery<RequestBody['GET']>(
    ['/api/v1/accounts/list'],
    () => getAccountConfigImportHistory(),
    { ...defaultOption, ...options }
  )
}
