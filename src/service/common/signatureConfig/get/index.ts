import { commonApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParam, Response } from './type'

export const getSignatureConfig = async (
  params?: RequestParam['GET']
): Promise<Response['GET']> => {
  const { data } = await commonApi({
    method: 'get',
    url: `/api/v1/config-signature`,
    params,
  })
  return data
}

export const useQueryGetSignatureConfig = (
  params?: RequestParam['GET'],
  options?: any
) => {
  return useQuery(
    [`/api/v1/config-signature`, params],
    () => getSignatureConfig(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
