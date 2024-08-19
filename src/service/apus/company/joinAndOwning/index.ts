import { authApusApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { ReqGetCompanyOwningList, ResGetCompanyOwningList } from './type'

export const END_POINT_COMPANY_OWNING_AND_JOIN =
  '/api/v1/company/owning-and-joining'

export const getCompanyJoinAndOwningList = async (
  params?: ReqGetCompanyOwningList
): Promise<ResGetCompanyOwningList> => {
  const { data } = await authApusApi({
    method: 'get',
    url: END_POINT_COMPANY_OWNING_AND_JOIN,
    params,
  })
  return data
}

export const useQueryGetCompanyOwningAndJoinList = (
  params?: ReqGetCompanyOwningList,
  options?: any
) => {
  return useQuery<ResGetCompanyOwningList>(
    [END_POINT_COMPANY_OWNING_AND_JOIN, params],
    () => getCompanyJoinAndOwningList(params),
    { ...defaultOption, ...options }
  )
}
