import { authSOApi, defaultOption } from '@/config/axios'
import { useQuery } from 'react-query'
import { POST } from './type'
import { TypePath } from '@/path'

// get quantity in stock by productl
export const useQueryGetQuantityStockByProducts = (params: any) => {
  return useQuery(
    ['/api/v1/sale-order/list/inventory', params],
    async () => {
      const { data } = await authSOApi({
        method: 'get',
        url: `/api/v1/sale-order/list/inventory`,
        params: { ...params, page: params.page },
      })
      return data ? data.data?.content : data
    },
    { ...defaultOption }
  )
}

export const getQuantityStockByProducts = async (params: any) => {
  const data = await authSOApi({
    method: 'get',
    url: `/api/v1/sale-order/list/inventory`,
    params: { ...params },
  })
  return data ? data.data.data : data
}

export const createSaleOrder = async (
  data: POST,
  typePath: TypePath,
  params?: any
) => {
  const url = `/api/v1/${typePath.toLowerCase()}/sale-order`
  const res = await authSOApi({
    method: 'POST',
    url,
    data,
    params: { ...params },
  })
  return res
}
