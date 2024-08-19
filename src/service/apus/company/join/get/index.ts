import { authApusApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { ReqGetCompanyJoinList, ResGetCompanyJoinList } from './type'

export const END_POINT_COMPANY_JOIN = '/api/v1/company/joining'

export const getCompanyJoinList = async (
  params?: ReqGetCompanyJoinList
): Promise<ResGetCompanyJoinList> => {
  const { data } = await authApusApi({
    method: 'get',
    url: END_POINT_COMPANY_JOIN,
    params,
  })
  return data
}

export const useQueryGetCompanyJoinList = (
  params?: ReqGetCompanyJoinList,
  options?: any
) => {
  return useQuery<ResGetCompanyJoinList>(
    [END_POINT_COMPANY_JOIN, params],
    () => getCompanyJoinList(params),
    { ...defaultOption, ...options }
  )
}
