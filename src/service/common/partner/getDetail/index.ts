import { commonApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from '../getDetail/type'

export const getPartnerDetail = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await commonApi({
    method: 'get',
    url: '/api/v1/partners',
    params,
  })

  return data
}

export const useQueryGetPartnerDetail = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/partners', params],
    () => getPartnerDetail(params),
    { ...defaultOption, ...options }
  )
}
