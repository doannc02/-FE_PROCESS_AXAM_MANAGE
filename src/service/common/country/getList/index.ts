import { commonApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getCountryList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await commonApi({
    method: 'get',
    url: 'api/v1/countries/list',
    params,
  })

  return data
}

export const useQueryGetCountryList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['api/v1/countries/list', params],
    () => getCountryList(params),
    { ...defaultOption, ...options }
  )
}
