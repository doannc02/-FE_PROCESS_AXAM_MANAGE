import { defaultOption, authSOApi } from '@/config/axios'
import { useQuery } from 'react-query'
import { Request, Response } from './type'
import  { useCheckPath,TypePath } from '@/path'

export const getReturnOrderController = async (
  params: Request['GET'],
  typePath: TypePath
): Promise<Response['GET']> => {
  const url = `/api/v1/${typePath.toLowerCase()}/sale-return-order/list`
  const { data } = await authSOApi({
    method: 'get',
    url,
    params,
  })
  return data ? data.data : data
}

export const useQueryGetReturnOrderController = (
  params: Request['GET'],
  options?: any
) => {
  const { typeSaleRequest } = useCheckPath()
  return useQuery<Response['GET']>(
    ['api/v1/sale-return-order/list', params],
    () => getReturnOrderController(params, typeSaleRequest),
    { ...defaultOption, ...options }
  )
}
