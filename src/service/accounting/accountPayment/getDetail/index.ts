import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParams, Response } from './type'

export const getAccountPaymentDetail = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: '/api/v1/account-payment/detail-payment',
    params: {
      accountPaymentId: params.id,
    },
  })
  return data
}

export const useQueryGetAccountPaymentDetail = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    [`/api/v1/account-payment/detail-payment`, params],
    () => getAccountPaymentDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
