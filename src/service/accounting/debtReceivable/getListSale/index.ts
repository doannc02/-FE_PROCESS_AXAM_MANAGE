import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getDebtSaleList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: 'api/v2/debt/list-sale',
    params,
  })

  return data
}

export const useQueryGetDebtSaleList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['api/v2/debt/list-sale', params],
    () => getDebtSaleList(params),
    { ...defaultOption, ...options }
  )
}
