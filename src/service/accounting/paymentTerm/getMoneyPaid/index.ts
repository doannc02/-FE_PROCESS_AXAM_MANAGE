import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParams, Response } from './type'

export const getMoneyPaid = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: `/api/v1/payment-term/moneyPaid`,
    params,
  })
  return data
}

export const useQueryGetMoneyPaid = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    [`/api/v1/payment-term/moneyPaid`, params],
    () => getMoneyPaid(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
