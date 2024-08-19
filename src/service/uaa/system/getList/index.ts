import { authUaaApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, ResponseSystem } from './type'

export const getSystemList = async (
  params: RequestBody['GET']
): Promise<ResponseSystem['GET']> => {
  const { data } = await authUaaApi({
    method: 'get',
    url: '/api/v1/system/list',
    params,
  })
  return data
}

export const useQueryGetSystemList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<ResponseSystem['GET']>(
    ['/api/v1/system/list', params],
    () => getSystemList(params),
    { ...defaultOption, ...options }
  )
}
