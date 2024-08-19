import  { useCheckPath,TypePath } from '@/path'
import { authSOApi, defaultOption } from '@/config/axios'
import { useQuery } from 'react-query'
import { Response, Request } from './type'

export const checkDebtConfigPartner = async (
  params: any,
  typePath: TypePath
): Promise<any> => {
  const url = `/api/v1/${typePath.toLowerCase()}/sale-order/has-debt-limit`
  const { data } = await authSOApi({
    method: 'get',
    url,
    params,
  })
  return data ? data.data : data
}

export const useQueryCheckDebtConfigPartner = (
  params: Request['PARAMS'],
  options?: any
) => {
  const { typeSaleRequest } = useCheckPath()
  return useQuery<Response['GET']>(
    ['/api/v1/sale-order/has-debt-limit', params],
    () => checkDebtConfigPartner(params, typeSaleRequest),
    { ...defaultOption, ...options }
  )
}
