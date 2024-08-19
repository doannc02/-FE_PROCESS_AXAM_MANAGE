import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParams, Response } from './type'

export const getPaymentTermDetail = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: `/api/v1/payment-term`,
    params,
  })
  return data
}

export const useQueryGetPaymentTermDetail = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    [`/api/v1/payment-term/${params.id}`, params],
    () => getPaymentTermDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
