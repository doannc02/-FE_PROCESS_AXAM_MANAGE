import { contractApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParams, Response } from './type'

export const getDebtPolicyDetail = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await contractApi({
    method: 'get',
    url: '/api/v1/sale/debt-granting-policies',
    params,
  })
  return data
}

export const useQueryGetDebtPolicyDetail = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    ['/api/v1/sale/debt-granting-policies', params],
    () => getDebtPolicyDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
