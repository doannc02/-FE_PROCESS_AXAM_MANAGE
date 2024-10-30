import { commonApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { BaseResponse, CommonObject, PageResponse } from '../type'
import { Course, RequestCourse } from './type'

const URL_COURSE = '/api/v1/course'

export const getListCourse = async (
  params: any
): Promise<PageResponse<Course[]>> => {
  const { data } = await commonApi({
    method: 'get',
    url: URL_COURSE + '/list',
    params,
  })

  return data
}

export const useQueryGetListCourse = (params: any, options?: any) => {
  return useQuery<PageResponse<Course[]>>(
    ['api/v1/course/list', params],
    () => getListCourse(params),
    { ...defaultOption, ...options }
  )
}

export const getDetailCourse = async (
  params: any
): Promise<BaseResponse<any>> => {
  const { data } = await commonApi({
    method: 'get',
    url: URL_COURSE + '/detail',
    params,
  })

  return data
}

export const useQueryGetDetailCourse = (params: any, options?: any) => {
  return useQuery<BaseResponse<any>>(
    ['api/v1/course/detail', params],
    () => getDetailCourse(params),
    { ...defaultOption, ...options }
  )
}

export const actionCourse = async (
  req: RequestCourse['ACTION']
): Promise<any> => {
  const { data } = await commonApi({
    method: req.method,
    url: URL_COURSE,
    params: req.params,
    data: req.data,
  })
  return data
}
