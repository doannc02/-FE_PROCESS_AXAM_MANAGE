import { commonApi } from '@/config/axios'
import { RequestDepartment, ResponseDepartment } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

const URL_DEPARTMENT = '/api/v1/department'

export const getDepartment = async (
  params: RequestDepartment['LIST']
): Promise<ResponseDepartment['LIST']> => {
  const { data } = await commonApi({
    method: 'get',
    url: URL_DEPARTMENT + '/list',
    params,
  })

  return data
}

export const useQueryGetDepartmentList = (
  params: RequestDepartment['LIST'],
  options?: any
) => {
  return useQuery<ResponseDepartment['LIST']>(
    ['api/v1/department/list', params],
    () => getDepartment(params),
    { ...defaultOption, ...options }
  )
}

export const getDetailExam = async (params: {
  id: number
}): Promise<ResponseDepartment['DETAIL']> => {
  const { data } = await commonApi({
    method: 'get',
    url: URL_DEPARTMENT + '/detail',
    params,
  })

  return data
}

export const useQueryDetailDepartment = (
  params: { id: number },
  options?: any
) => {
  return useQuery<ResponseDepartment['DETAIL']>(
    ['api/v1/department/detail', params],
    () => getDetailExam(params),
    { ...defaultOption, ...options }
  )
}

export const actionDepartment = async (
  req: RequestDepartment['ACTION']
): Promise<any> => {
  const { data } = await commonApi({
    method: req.method,
    url: URL_DEPARTMENT,
    params: req.params,
    data: req.data,
  })
  return data
}
