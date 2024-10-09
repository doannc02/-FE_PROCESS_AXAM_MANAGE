import { commonApi } from '@/config/axios'
import { RequestMajor, ResponseMajor } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

const URL_EXAM = '/api/v1/major'

export const getMajorList = async (
  params: RequestMajor['LIST']
): Promise<ResponseMajor['LIST']> => {
  const { data } = await commonApi({
    method: 'get',
    url: URL_EXAM + '/list',
    params,
  })

  return data
}

export const useQueryGetAcademicYearList = (
  params: RequestMajor['LIST'],
  options?: any
) => {
  return useQuery<ResponseMajor['LIST']>(
    ['api/v1/major/list', params],
    () => getMajorList(params),
    { ...defaultOption, ...options }
  )
}

export const getDetailExam = async (params: {
  id: number
}): Promise<ResponseMajor['DETAIL']> => {
  const { data } = await commonApi({
    method: 'get',
    url: URL_EXAM + '/detail',
    params,
  })

  return data
}

export const useQueryGetDetailExam = (
  params: { id: number },
  options?: any
) => {
  return useQuery<ResponseMajor['DETAIL']>(
    ['api/v1/major/detail', params],
    () => getDetailExam(params),
    { ...defaultOption, ...options }
  )
}

export const actionExamSet = async (
  req: RequestMajor['ACTION']
): Promise<any> => {
  const { data } = await commonApi({
    method: req.method,
    url: URL_EXAM,
    params: req.params,
    data: req.data,
  })
  return data
}
