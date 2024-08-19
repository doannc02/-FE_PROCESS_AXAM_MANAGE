import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParams, Response } from './type'

export const getDecreaseAssetDetail = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: '/api/v1/decrease-asset',
    params,
  })
  return data
}

export const useQueryGetDecreaseAssetDetail = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    ['/api/v1/decrease-asset', params],
    () => getDecreaseAssetDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
