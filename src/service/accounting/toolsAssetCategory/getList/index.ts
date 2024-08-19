import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParams, Response } from './type'

export const getToolsAssetList = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: 'api/v1/tools-asset-category/list',
    params,
  })

  return data
}

export const useQueryGetToolsAssetList = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['api/v1/tools-asset-category/list', params],
    () => getToolsAssetList(params),
    { ...defaultOption, ...options }
  )
}
