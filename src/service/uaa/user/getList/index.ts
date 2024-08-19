import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { authUaaApi } from '@/config/axios'

export const getUserList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authUaaApi({
    method: 'get',
    url: '/api/v1/user/list',
    params,
  })

  return data
}

export const useQueryGetUserList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/user/list', params],
    () => getUserList(params),
    { ...defaultOption, ...options }
  )
}
