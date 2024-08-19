import { authSOApi, defaultOption } from '@/config/axios'
import { useQuery } from 'react-query'
import { Response, Request } from './type'
import {useCheckPath} from '@/path'

export const getListProductOrder = async (
  params: Request['GET']
): Promise<Response['GET']> => {
  const { data } = await authSOApi({
    method: 'get',
    url: `/api/v1/sale-order/split/products`,
    params,
  })
  return data ? data.data : data
}

export const useQueryGetListProductBySaleOrder = (params: Request['GET']) => {
  return useQuery<Response['GET']>(
    [`/api/v1/retail/sale-order/split/products`, params],
    () => getListProductOrder(params),
    // type === 'RETAIL'
    //   ? getListProductByRetailOrder(params)
    //   : getListProductByWholesaleOrder(params),
    { ...defaultOption }
  )
}
