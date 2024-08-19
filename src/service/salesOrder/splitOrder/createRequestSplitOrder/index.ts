import { authSOApi, defaultOption } from '@/config/axios'
import { useQuery } from 'react-query'
import { Request } from './type'

export const createRequestSplitRetailOrder = async (
  data: Request['POST'],
  params: Request['PARAMS']
) => {
  const res = await authSOApi({
    method: 'POST',
    url: `/api/v1/retail/sale-order/split`,
    data,
    params: { ...params },
  })
  return res
}

export const createRequestSplitWholesaleOrder = async (
  data: Request['POST'],
  params: Request['PARAMS']
) => {
  const res = await authSOApi({
    method: 'POST',
    url: `/api/v1/wholesale/sale-order/split`,
    data,
    params: { ...params },
  })
  return res
}
