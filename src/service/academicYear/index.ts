import { commonApi } from '@/config/axios'
import { RequestAcademicYear, ResponseAcademicYear } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

const URL_ACADEMIC_YEAR = '/api/v1/academicyear'

export const getAcademicYears = async (
  params: RequestAcademicYear['LIST']
): Promise<ResponseAcademicYear['LIST']> => {
  const { data } = await commonApi({
    method: 'get',
    url: URL_ACADEMIC_YEAR + '/list',
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

export const getDetailAcademicYear = async (params: {
  id: number
}): Promise<ResponseAcademicYear['DETAIL']> => {
  const { data } = await commonApi({
    method: 'get',
    url: URL_ACADEMIC_YEAR + '/detail',
    params,
  })

  return data
}

export const useQueryGetDetailAcademic = (
  params: { id: number },
  options?: any
) => {
  return useQuery<ResponseAcademicYear['DETAIL']>(
    ['api/v1/academicyear/detail', params],
    () => getDetailAcademicYear(params),
    { ...defaultOption, ...options }
  )
}

export const actionAcademic = async (
  req: RequestAcademicYear['ACTION']
): Promise<any> => {
  const { data } = await commonApi({
    method: req.method,
    url: URL_ACADEMIC_YEAR,
    params: req.params,
    data: req.data,
  })
  return data
}
