import { authWarehouseApi, defaultOption, authCommonAPI } from '@/config/axios'
import { useQuery } from 'react-query'
import { Request, Response } from './type'
import  { useCheckPath,TypePath } from '@/path'

export const getPartnerTag = async (
  params: Request['GET'],
  typePath: TypePath
): Promise<Response['GET']> => {
  const type =
    typePath === 'WHOLESALE' ? 'B2B' : typePath === 'RETAIL' ? 'B2C' : typePath
  const url = `api/v1/${type.toLowerCase()}/partner-tag/list`
  const { data } = await authCommonAPI({
    method: 'get',
    url,
    params,
  })
  return data ? data.data : data
}

export const useQueryGetPartnerTag = (
  params: Request['GET'],
  options?: any
) => {
  const { typeSaleRequest } = useCheckPath()
  return useQuery<Response['GET']>(
    ['api/v1/partner-tag/list', params],
    () => getPartnerTag(params, typeSaleRequest),
    { ...defaultOption, ...options }
  )
}
