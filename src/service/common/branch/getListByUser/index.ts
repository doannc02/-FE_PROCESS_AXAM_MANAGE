import { commonApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

const URL = '/api/v1/user-branch-map/list'

export const getUserBranchList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await commonApi({
    method: 'get',
    url: URL,
    params,
  })
  return data
}

export const useQueryGetUserBranchList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    [URL, params],
    () => getUserBranchList(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
