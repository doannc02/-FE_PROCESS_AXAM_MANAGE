import { authCommonAPI } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParamWard, ResponseWard } from './type'

export const getWardListByDistrictId = async (
  params: RequestParamWard['GET']
): Promise<ResponseWard['GET']> => {
  const { data } = await authCommonAPI({
    method: 'get',
    url: '/api/v1/ward/list/ward-district',
    params,
  })
  return data
}

export const useQueryGetWardListByDistrictId = (
  params: RequestParamWard['GET'],
  options?: any
) => {
  return useQuery<ResponseWard['GET']>(
    ['/api/v1/ward/list/ward-district', params],
    () => getWardListByDistrictId(params),
    { ...defaultOption, ...options }
  )
}
