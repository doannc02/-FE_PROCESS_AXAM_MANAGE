import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const END_POINT_TAX_CONFIG = '/api/v1/tax-return-config'

export const getTaxReturnConfigDetail = async (
  params: RequestBody['SAVE']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: END_POINT_TAX_CONFIG,
    params,
  })

  return data
}

export const useQueryGetTaxReturnConfigDetail = (
  params: RequestBody['SAVE'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    [END_POINT_TAX_CONFIG, params],
    () => getTaxReturnConfigDetail(params),
    { ...defaultOption, ...options }
  )
}
