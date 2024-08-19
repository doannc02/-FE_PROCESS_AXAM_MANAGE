import { authUaaApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import {
  ReqGetSystemDetail,
  ReqGetSystemList,
  ResGetSystemDetail,
  ResGetSystemList,
} from './type'

export const END_POINT_SYSTEM = '/api/v1/system'

export const getSystemList = async (
  params: ReqGetSystemList
): Promise<ResGetSystemList> => {
  const { data } = await authUaaApi({
    method: 'get',
    url: END_POINT_SYSTEM + '/list',
    params,
  })
  return data
}

export const useQueryGetSystemList = (
  params: ReqGetSystemList,
  options?: any
) => {
  return useQuery<ResGetSystemList>(
    [END_POINT_SYSTEM + '/list', params],
    () => getSystemList(params),
    { ...defaultOption, ...options }
  )
}

export const getSystemDetail = async (
  params: ReqGetSystemDetail
): Promise<ResGetSystemDetail> => {
  const { data } = await authUaaApi({
    method: 'get',
    url: END_POINT_SYSTEM,
    params,
  })
  return data
}

export const useQueryGetSystemDetail = (
  params: ReqGetSystemDetail,
  options?: any
) => {
  return useQuery<ResGetSystemDetail>(
    [END_POINT_SYSTEM, params],
    () => getSystemDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
