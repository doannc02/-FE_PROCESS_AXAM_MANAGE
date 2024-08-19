// /api/v1/sale-order

import { authSOApi, defaultOption } from '@/config/axios'
import { useQuery } from 'react-query'
import { Response } from './type'
import  { useCheckPath,TypePath } from '@/path'

export const getDetailSaleOrderById = async (
  params: any,
  typePath: TypePath
): Promise<any> => {
  const url = `/api/v1/${typePath.toLowerCase()}/sale-order`
  const { data } = await authSOApi({
    method: 'get',
    url,
    params,
  })
  return data ? data.data : data
}

export const useQueryGetSalesOrderById = (params: any, options?: any) => {
  const { typeSaleRequest } = useCheckPath()
  return useQuery<Response['GET']>(
    ['/api/v1/sale-order', params],
    () => getDetailSaleOrderById(params, typeSaleRequest),
    { ...defaultOption, ...options }
  )
}
