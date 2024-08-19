import { authSOApi } from '@/config/axios'
import { Response } from './type'

// list of delivery slips
export const getListDeliverySlips = async (
  params: any
): Promise<Response['GET']> => {
  const res = await authSOApi({
    method: 'GET',
    url: `/api/v1/request-stock/sale-order/request-stock`,
    params: { ...params },
  })
  return res ? res.data.data : res
}
