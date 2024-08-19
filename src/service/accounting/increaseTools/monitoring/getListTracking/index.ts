import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getTrackingToolList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: '/api/v1/track-depreciation/list-increased-tools',
    params,
  })

  return data
}

export const useQueryGetTrackingToolList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/track-depreciation/list-increased-tools', params],
    () => getTrackingToolList(params),
    { ...defaultOption, ...options }
  )
}
