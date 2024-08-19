import { authSOApi } from '@/config/axios'
import { Request } from './type'

export const createSaleOrderLine = async (
  data: Request['PUT'],
  params: any
) => {
  const res = await authSOApi({
    method: 'PUT',
    url: `/api/v1/sale-order/line`,
    data,
    params: { ...params },
  })
  return res ? res.data.data : res
}

export const updateSaleOrderLine = async (
  data: Request['PUT'],
  params: any
) => {
  const res = await authSOApi({
    method: 'PUT',
    url: `/api/v1/request-stock/sale-order/request-stock`,
    data,
    params: { ...params },
  })
  return res ? res.data.data : res
}
