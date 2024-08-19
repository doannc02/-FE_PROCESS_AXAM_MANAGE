import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const END_POINT_TAX_RETURN = '/api/v1/tax-return'

export const getTaxReturnDetail = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: END_POINT_TAX_RETURN,
    params,
  })

  return data
}

export const useQueryGetTaxReturnDetail = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    [END_POINT_TAX_RETURN, params],
    () => getTaxReturnDetail(params),
    { ...defaultOption, ...options }
  )
}
