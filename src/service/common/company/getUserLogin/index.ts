import { commonApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParams, Response } from './type'

export const getUserLoginCompany = async (
  params?: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await commonApi({
    method: 'get',
    url: `/api/v1/companies/user-login`,
    params,
  })
  return data
}

export const useQueryGetUserLoginCompany = (
  params?: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    [`/api/v1/companies/user-login`, params],
    () => getUserLoginCompany(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
