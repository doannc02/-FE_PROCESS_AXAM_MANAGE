import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParams, Response } from './type'

export const getCashRoundingDetail = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: `/api/v1/cash-rounding`,
    params,
  })
  return data
}

export const useQueryGetCashRoundingDetail = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    [`/api/v1/cash-rounding`, params],
    () => getCashRoundingDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
