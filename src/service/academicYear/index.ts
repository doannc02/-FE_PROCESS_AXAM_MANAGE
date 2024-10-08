import { commonApi } from '@/config/axios'
import { RequestAcademicYear, ResponseAcademicYear } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

const URL_EXAM = '/api/v1/academicyear'

export const getAcademicYears = async (
  params: RequestAcademicYear['LIST']
): Promise<ResponseAcademicYear['LIST']> => {
  const { data } = await commonApi({
    method: 'get',
    url: URL_EXAM + '/list',
    params,
  })

  return data
}

export const useQueryGetAcademicYearList = (
  params: RequestAcademicYear['LIST'],
  options?: any
) => {
  return useQuery<ResponseAcademicYear['LIST']>(
    ['api/v1/academicyear/list', params],
    () => getAcademicYears(params),
    { ...defaultOption, ...options }
  )
}

export const getDetailExam = async (params: {
  id: number
}): Promise<ResponseAcademicYear['DETAIL']> => {
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
  return useQuery<ResponseAcademicYear['DETAIL']>(
    ['api/v1/academicyear/detail', params],
    () => getDetailExam(params),
    { ...defaultOption, ...options }
  )
}

export const actionExamSet = async (
  req: RequestAcademicYear['ACTION']
): Promise<any> => {
  const { data } = await commonApi({
    method: req.method,
    url: URL_EXAM,
    params: req.params,
    data: req.data,
  })
  return data
}
