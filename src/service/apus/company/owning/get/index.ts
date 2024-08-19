import { authApusApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { ReqGetCompanyOwningList, ResGetCompanyOwningList } from './type'

export const END_POINT_COMPANY_OWNING = '/api/v1/company/owning'

export const getCompanyOwningList = async (
  params?: ReqGetCompanyOwningList
): Promise<ResGetCompanyOwningList> => {
  const { data } = await authApusApi({
    method: 'get',
    url: END_POINT_COMPANY_OWNING,
    params,
  })
  return data
}

export const useQueryGetCompanyOwningList = (
  params?: ReqGetCompanyOwningList,
  options?: any
) => {
  return useQuery<ResGetCompanyOwningList>(
    [END_POINT_COMPANY_OWNING, params],
    () => getCompanyOwningList(params),
    { ...defaultOption, ...options }
  )
}
