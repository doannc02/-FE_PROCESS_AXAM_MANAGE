import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParams } from './type'

export const getTotalTrackingEscTool = async (
  params: RequestParams['GET']
): Promise<any> => {
  const { data } = await accountingApi({
    method: 'get',
    url: '/api/v1/track-depreciation/total-increased-tools',
    params,
  })
  return data
}

export const useQueryGetTotalTrackingEscTool = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    ['/api/v1/track-depreciation/total-increased-tools', params],
    () => getTotalTrackingEscTool(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
