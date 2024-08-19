import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { END_POINT_TAX_CONFIG } from '../getDetail'

export const getTaxReturnConfigList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: END_POINT_TAX_CONFIG + '/list',
    params,
  })

  return data
}

export const useQueryGetTaxReturnConfigList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    [END_POINT_TAX_CONFIG + '/list', params],
    () => getTaxReturnConfigList(params),
    { ...defaultOption, ...options }
  )
}
