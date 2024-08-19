import { authSOApi, defaultOption } from '@/config/axios'
import { useQuery } from 'react-query'
import { Response } from './type'
import { TypePath, useCheckPath } from '@/path'

export const getListSaleOrder = async (
  params: any,
  typePath: TypePath
): Promise<any> => {
  if (params.search === '') delete params.search
  const url = `/api/v1/${typePath.toLowerCase()}/sale-order/list`
  const { data } = await authSOApi({
    method: 'get',
    url,
    params,
  })
  return data
}

export const useQueryGetListSaleOrder = (params: any) => {
  const { typeSaleRequest } = useCheckPath()
  return useQuery<Response['GET']>(
    ['/api/v1/sale-order/list', params],
    () => getListSaleOrder(params, typeSaleRequest),
    { ...defaultOption }
  )
}
