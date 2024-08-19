import { authCommonAPI } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getFiscalYear = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authCommonAPI({
    method: 'get',
    url: '/api/v1/fiscal-year-config/list',
    params,
  })

  return data
}

export const useQueryGetFiscalYear = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['api/v1/fiscal-year/list', params],
    () => getFiscalYear(params),
    { ...defaultOption, ...options }
  )
}
