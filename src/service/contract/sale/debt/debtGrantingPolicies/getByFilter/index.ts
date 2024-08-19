import { contractApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getDebtFilter = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await contractApi({
    method: 'get',
    url: '/api/v1/sale/debt-granting-policies/list-waiting-posted',
    params,
  })

  return data
}

export const useQueryGetDebtFilter = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/sale/debt-granting-policies/list-waiting-posted', params],
    () => getDebtFilter(params),
    { ...defaultOption, ...options }
  )
}
