import { authUaaApi, defaultOption } from '@/config/axios'
import { useQuery } from 'react-query'
import { Request, Response } from './type'

export const getUserController = async (
  params: Request['GET']
): Promise<Response['GET']> => {
  const { data } = await authUaaApi({
    method: 'get',
    url: 'api/v1/user/list-by-role',
    params,
  })

  return data ? data.data : data
}

export const useQueryGetUserController = (
  params: Request['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['api/v1/user/list-by-role', params],
    () => getUserController(params),
    { ...defaultOption, ...options, enabled: !!params.roleId }
  )
}
