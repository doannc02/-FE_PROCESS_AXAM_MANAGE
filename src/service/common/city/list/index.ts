import { authCommonAPI } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParamCity, ResponseCityList } from './type'

export const getCityList = async (
  params: RequestParamCity['GET']
): Promise<ResponseCityList['GET']> => {
  const { data } = await authCommonAPI({
    method: 'get',
    url: '/api/v1/cities/list/city-country',
    params,
  })
  return data
}

export const useQueryGetCityList = (
  params: RequestParamCity['GET'],
  options?: any
) => {
  return useQuery<ResponseCityList['GET']>(
    ['/api/v1/cities/list/city-country', params],
    () => getCityList(params),
    { ...defaultOption, ...options }
  )
}
