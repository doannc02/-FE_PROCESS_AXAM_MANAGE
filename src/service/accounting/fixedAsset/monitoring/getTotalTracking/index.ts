import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParams } from './type'

export const getTotalTrackingEscAsset = async (
  params: RequestParams['GET']
): Promise<any> => {
  const { data } = await accountingApi({
    method: 'get',
    url: '/api/v1/track-depreciation/total-increased-asset',
    params,
  })
  return data
}

export const useQueryGetTotalTrackingEscAsset = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    ['/api/v1/track-depreciation/total-increased-asset', params],
    () => getTotalTrackingEscAsset(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
