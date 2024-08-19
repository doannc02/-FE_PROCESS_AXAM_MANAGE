import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getDebtExceptionList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: 'api/v2/debt/list-exception',
    params,
  })

  return data
}

export const useQueryGetDebtExceptionList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['api/v2/debt/list-exception', params],
    () => getDebtExceptionList(params),
    { ...defaultOption, ...options }
  )
}
