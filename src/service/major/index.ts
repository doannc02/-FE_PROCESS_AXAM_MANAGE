import { commonApi } from '@/config/axios'
import { RequestMajor, ResponseMajor } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'
import { BaseResponse } from '../type'

const URL_MAJOR = '/api/v1/major'

export const getMajorList = async (
  params: RequestMajor['LIST']
): Promise<ResponseMajor['LIST']> => {
  const { data } = await commonApi({
    method: 'get',
    url: URL_MAJOR + '/list',
    params,
  })

  return data
}

export const useQueryGetMajorList = (
  params: RequestMajor['LIST'],
  options?: any
) => {
  return useQuery<ResponseMajor['LIST']>(
    ['api/v1/major/list', params],
    () => getMajorList(params),
    { ...defaultOption, ...options }
  )
}

export const getDetailMajor = async (params: {
  id: number
}): Promise<BaseResponse<any>> => {
  const { data } = await commonApi({
    method: 'get',
    url: URL_MAJOR + '/detail',
    params,
  })

  return data
}

export const useQueryGetDetailMajor = (
  params: { id: number },
  options?: any
) => {
  return useQuery<BaseResponse<any>>(
    ['api/v1/major/detail', params],
    () => getDetailMajor(params),
    { ...defaultOption, ...options }
  )
}

export const actionMajor = async (
  req: RequestMajor['ACTION']
): Promise<any> => {
  const { data } = await commonApi({
    method: req.method,
    url: URL_MAJOR,
    params: req.params,
    data: req.data,
  })
  return data
}
