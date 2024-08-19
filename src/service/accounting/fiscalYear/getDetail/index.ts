import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParams, Response } from './type'

export const getFiscalYear = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: `/api/v1/fiscal-year`,
    params,
  })
  return data
}

export const useQueryGetFiscalYear = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    [`/api/v1/fiscal-year`, params],
    () => getFiscalYear(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
