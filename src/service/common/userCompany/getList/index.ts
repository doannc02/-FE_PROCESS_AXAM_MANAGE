import { commonApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { ReqUserCompany, ResUserCompany, ResponseTotalUser } from './type'

const END_POINT = '/api/v1/user-company/list'

export const getUserCompanyList = async (
  params: ReqUserCompany
): Promise<ResUserCompany> => {
  const { data } = await commonApi({
    method: 'get',
    url: END_POINT,
    params,
  })
  return data
}

export const useQueryGetUserCompanyList = (
  params: ReqUserCompany,
  options?: any
) => {
  return useQuery<ResUserCompany>(
    [END_POINT, params],
    () => getUserCompanyList(params),
    { ...defaultOption, ...options }
  )
}

export const getTotalUser = async (params: any): Promise<ResponseTotalUser> => {
  const { data } = await commonApi({
    method: 'get',
    url: '/api/v1/user-company/total-user',
    params,
  })
  return data.data
}

export const useQueryGetTotalUser = (params?: any, options?: any) => {
  return useQuery<ResponseTotalUser>(
    ['/api/v1/user-company/total-user', params],
    () => getTotalUser(params),
    { ...defaultOption, ...options }
  )
}
