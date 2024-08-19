export const URL_UNFINISHED_COST = '/api/v1/unfinished_cost'
import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParamsUC, ResponseUC } from '../actionUnfinished/type'

export const getUC = async (
  params: RequestParamsUC['GET']
): Promise<ResponseUC['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: URL_UNFINISHED_COST,
    params,
  })

  return data
}

export const useQueryGetUC = (
  params: RequestParamsUC['GET'],
  options?: any
) => {
  return useQuery<ResponseUC['GET']>(
    [URL_UNFINISHED_COST, params],
    () => getUC(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
