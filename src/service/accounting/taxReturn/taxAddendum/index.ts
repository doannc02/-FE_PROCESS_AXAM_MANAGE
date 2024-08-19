import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const END_POINT_TAX_ADDENDUM = '/api/v1/tax-return/tax-addendum'

export const getTaxReturnAddendumList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: END_POINT_TAX_ADDENDUM + '/list',
    params,
  })

  return data
}

export const useQueryGetTaxReturnAddendumList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    [END_POINT_TAX_ADDENDUM + '/list', params],
    () => getTaxReturnAddendumList(params),
    { ...defaultOption, ...options }
  )
}
