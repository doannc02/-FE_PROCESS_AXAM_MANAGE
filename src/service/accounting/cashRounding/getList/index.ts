import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getCashRoundingList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: 'api/v1/cash-rounding/list',
    params,
  })

  return data
}

export const useQueryGetCashRoundingList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['api/v1/cash-rounding/list', params],
    () => getCashRoundingList(params),
    { ...defaultOption, ...options }
  )
}
