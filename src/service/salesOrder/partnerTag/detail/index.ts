import { authCommonAPI, defaultOption } from '@/config/axios'
import { RequestBody, Response } from './type'
import { useQuery } from 'react-query'
import  { TypePath, useCheckPath } from '@/path'

export const getPartnerTagById = async (
  params: RequestBody['GET'],
  typePath: TypePath
): Promise<Response['GET']> => {
  const url =
    typePath === 'MERCHANT'
      ? 'api/v1/merchant/partner-tag'
      : typePath === 'WHOLESALE'
      ? 'api/v1/wholesale/partner-tag'
      : typePath === 'RETAIL'
      ? 'api/v1/wholesale/partner-tag'
      : 'api/v1/partner-tag'
  const { data } = await authCommonAPI({
    url,
    method: 'get',
    params,
  })
  return data ? data.data : data
}

export const useQueryGetPartnerTagById = (params?: any, options?: any) => {
  const { typeSaleRequest } = useCheckPath()
  return useQuery<Response['GET']>(
    ['/api/v1/partner-tag', params],
    () => getPartnerTagById(params, typeSaleRequest),
    { ...defaultOption, ...options }
  )
}
