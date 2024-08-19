import { authCommonAPI } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParamDistrict, ResponseDistrictList } from './type'

export const getDistrictListByCityId = async (
  params: RequestParamDistrict['GET']
): Promise<ResponseDistrictList['GET']> => {
  const { data } = await authCommonAPI({
    method: 'get',
    url: '/api/v1/districts/list/district-city',
    params,
  })
  return data
}

export const useQueryGetDistrictListByCityId = (
  params: RequestParamDistrict['GET'],
  options?: any
) => {
  return useQuery<ResponseDistrictList['GET']>(
    ['/api/v1/districts/list/district-city', params],
    () => getDistrictListByCityId(params),
    { ...defaultOption, ...options }
  )
}
