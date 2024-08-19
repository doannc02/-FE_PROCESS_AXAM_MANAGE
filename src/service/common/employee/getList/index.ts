import { authCommonAPI } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getEmployeeList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authCommonAPI({
    method: 'get',
    url: '/api/v1/employee/list',
    params,
  })
  return data
}

export const useQueryGetEmployeeList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/currency/list', params],
    () => getEmployeeList(params),
    { ...defaultOption, ...options }
  )
}
