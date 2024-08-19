import { authUaaApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { ReqGetSystemList, ResGetSystemList } from './type'

export const END_POINT_SYSTEM_BY_USER = '/api/v1/system/list-by-user'

export const getSystemByUserList = async (
  params?: ReqGetSystemList
): Promise<ResGetSystemList> => {
  const { data } = await authUaaApi({
    method: 'get',
    url: END_POINT_SYSTEM_BY_USER,
    params,
  })
  return data
}

export const useQueryGetSystemByUserList = (
  params?: ReqGetSystemList,
  options?: any
) => {
  return useQuery<ResGetSystemList>(
    [END_POINT_SYSTEM_BY_USER, params],
    () => getSystemByUserList(params),
    { ...defaultOption, ...options }
  )
}
