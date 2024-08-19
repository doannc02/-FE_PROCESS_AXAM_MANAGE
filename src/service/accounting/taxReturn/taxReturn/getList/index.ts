import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const END_POINT_TAX_RETURN = '/api/v1/tax-return'

export const getTaxReturnList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: END_POINT_TAX_RETURN + '/list',
    params,
  })

  return data
}

export const useQueryGetTaxReturnList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    [END_POINT_TAX_RETURN + '/list', params],
    () => getTaxReturnList(params),
    { ...defaultOption, ...options }
  )
}
