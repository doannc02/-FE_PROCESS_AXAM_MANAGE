import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getDebtPaidDetail = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: '/api/v2/debt-paid/detail-paid',
    params,
  })

  return data
}

export const useQueryGetDebtPaidDetail = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v2/debt-paid/detail-paid', params],
    () => getDebtPaidDetail(params),
    { ...defaultOption, ...options }
  )
}
