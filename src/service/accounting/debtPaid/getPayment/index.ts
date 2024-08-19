import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getPaymentPaidDebt = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: '/api/v2/debt-paid/pop-up',
    params,
  })

  return data
}

export const useQueryGetPaymentPaidDebt = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v2/debt-paid/pop-up', params],
    () => getPaymentPaidDebt(params),
    { ...defaultOption, ...options }
  )
}
