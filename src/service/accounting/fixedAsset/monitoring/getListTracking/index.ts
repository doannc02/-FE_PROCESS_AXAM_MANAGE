import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getTrackingAssetList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: '/api/v1/track-depreciation/list-increased-asset',
    params,
  })

  return data
}

export const useQueryGetTrackingAssetList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/track-depreciation/list-increased-asset', params],
    () => getTrackingAssetList(params),
    { ...defaultOption, ...options }
  )
}
