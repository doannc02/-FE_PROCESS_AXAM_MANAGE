import { commonApi } from '@/config/axios'
import { ResponseUsers } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'
import { BaseResponse } from '@/service/type'

const URL_USER = '/api/v1/user'

export const getListUser = async (
  params: any
): Promise<ResponseUsers['GET_LIST']> => {
  const { data } = await commonApi({
    method: 'get',
    url: URL_USER + '/list',
    params,
  })

  return data
}

export const getDetailUser = async (): Promise<BaseResponse<any>> => {
  const { data } = await commonApi({
    method: 'get',
    url: URL_USER + '/detail',
  })

  return data
}
export const useQueryGetListUser = (params: any, options?: any) => {
  return useQuery<ResponseUsers['GET_LIST']>(
    ['api/v1/user/list', params],
    () => getListUser(params),
    { ...defaultOption, ...options }
  )
}
