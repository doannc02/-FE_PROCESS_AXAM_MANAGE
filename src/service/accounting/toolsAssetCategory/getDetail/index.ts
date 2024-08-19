import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParams, Response } from './type'

export const getDetailToolsAssetCategory = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: '/api/v1/tools-asset-category',
    params,
  })
  return data
}

export const useQueryGetDetailToolsAssetCategory = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    ['/api/v1/tools-asset-category', params],
    () => getDetailToolsAssetCategory(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
