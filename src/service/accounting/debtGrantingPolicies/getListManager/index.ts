import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getDebtApprove = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: 'api/v1/debt-granting-policies/list-manager',
    params,
  })

  return data
}

export const useQueryGetDebtApprove = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['api/v1/debt-granting-policies/list-manager', params],
    () => getDebtApprove(params),
    { ...defaultOption, ...options }
  )
}
