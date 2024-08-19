import { authCommonAPI } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getDepartmentList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authCommonAPI({
    method: 'get',
    url: '/api/v1/department/list',
    params,
  })

  return data
}

export const useQueryGetDepartmentList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['api/v1/department/list', params],
    () => getDepartmentList(params),
    { ...defaultOption, ...options }
  )
}
